import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import imageCompression from "browser-image-compression";

const TestUpload = () => {
  const usersData = useSelector((state) => state.usersReducer);
  const uid = useContext(UidContext);
  const [file, setFile] = useState();
  const [picture, setPicture] = useState();
  const [compPic, setCompPic] = useState();
  const [editPseudo, setEditPseudo] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const image = new FormData();
  //   image.append("image", file);
  //   image.append("posterId", uid);
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}api/post`, image)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };
  const handlePicture = async (e) => {
    setFile(e.target.files[0]);
    setPicture(URL.createObjectURL(e.target.files[0]));
    console.log(file);

    console.log("originalFile instanceof Blob", file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      console.log(compressedFile);
      setCompPic(URL.createObjectURL(compressedFile));

      // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleUpload = () => {
  //     if (file) {
  //       const image = new FormData();
  //       image.append("image", file);

  //     }
  //   };
  return (
    <div>
      <form encType="multipart/form-data">
        <input
          type="file"
          name="image"
          formEncType="multipart/form-data"
          onChange={handlePicture}
        />
        <input type="submit" value="envoyer" />
      </form>

      {picture && <img src={picture} alt="" />}
      {compPic && <img src={compPic} alt="" />}
      {usersData && uid && (
        <>
          {editPseudo ? (
            <>
              <textarea
                defaultValue={
                  usersData.filter((user) => user._id === uid)[0].pseudo
                }
              />
            </>
          ) : (
            <>
              <p>{usersData.filter((user) => user._id === uid)[0].pseudo}</p>
              <button onClick={() => setEditPseudo(!editPseudo)}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TestUpload;
