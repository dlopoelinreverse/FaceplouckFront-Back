import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateClientProfil,
  uploadClientPicture,
} from "../../actions/users.actions";
import { UidContext } from "../AppContext";
import imageCompression from "browser-image-compression";

const EditingProfil = () => {
  const uid = useContext(UidContext);
  const clientData = useSelector(
    (state) => state.usersReducer.filter((user) => user._id === uid)[0]
  );
  const [editPseudo, setEditPseudo] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [newPseudo, setNewPseudo] = useState("");
  const [newBio, setNewBio] = useState("");
  const [file, setFile] = useState("");
  // const [newUserPicture, setNewUserPicture] = useState("");

  const dispatch = useDispatch();

  const handlePicture = async (e) => {
    const inputFile = e.target.files[0];

    console.log(`originalFile size ${inputFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.04, //40 Kb
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(inputFile, options);

      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      console.log(compressedFile);
      // setNewUserPicture(URL.createObjectURL(compressedFile));
      setFile(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUpdate = (e) => {
    e.preventDefault();
    if (newPseudo !== clientData.pseudo || newBio !== clientData.bio || file) {
      if (newPseudo) {
        dispatch(updateClientProfil(uid, newPseudo, clientData.bio));
        setEditPseudo(false);
      } else if (newBio) {
        dispatch(updateClientProfil(uid, clientData.pseudo, newBio));
        setEditBio(false);
      } else if (file) {
        const data = new FormData();
        data.append("newPseudo", clientData.pseudo);
        data.append("id", uid);
        data.append("image", file);

        dispatch(uploadClientPicture(data, uid));
      }
    } else {
      setEditPseudo(false);
      setEditBio(false);
    }
  };
  return (
    <div className="edit-profil">
      <div className="edit-profil-container">
        <div className="pseudo">
          {editPseudo ? (
            <>
              <textarea
                defaultValue={clientData.pseudo}
                onChange={(e) => setNewPseudo(e.target.value)}
              />
              <button onClick={handleEditUpdate}>valider</button>
              <button onClick={() => setEditPseudo(false)}>X</button>
            </>
          ) : (
            <>
              <p>{clientData.pseudo}</p>
              <span className="btn" onClick={() => setEditPseudo(!editPseudo)}>
                <img src="/img/icons/edit-pencil.svg" alt="edit" />
              </span>
            </>
          )}
        </div>
        <div className="bio">
          {editBio ? (
            <>
              <textarea
                defaultValue={clientData.bio}
                onChange={(e) => setNewBio(e.target.value)}
              />
              <button onClick={handleEditUpdate}>valider</button>
              <button onClick={() => setEditBio(false)}>X</button>
            </>
          ) : (
            <>
              <p>{clientData.bio}</p>
              <span className="btn" onClick={() => setEditBio(!editBio)}>
                <img src="/img/icons/edit-pencil.svg" alt="edit" />
              </span>
            </>
          )}
        </div>
        <div className="profil-picture">
          <form onSubmit={handleEditUpdate} className="picture">
            <label htmlFor="file">Changer d'image</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handlePicture}
            />
            <br />
            <input type="submit" value="Changer" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditingProfil;
