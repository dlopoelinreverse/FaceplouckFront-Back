import React from "react";
import { Link } from "react-router-dom";

const UserMiniData = ({ posterData, origin, fromType }) => {
  return (
    <>
      {fromType === "profil-feed" && (
        <div className="user-mini-data">
          <div className="user-data">
            <img
              // src={`${process.env.REACT_APP_API_URL}${posterData.picture}`}
              src={posterData.picture}
              alt=""
            />
            <h3>{posterData.pseudo} </h3>
          </div>
        </div>
      )}
      {fromType === "post-comments" && (
        <div className="user-mini-data">
          <div className="user-data">
            <img
              // src={`${process.env.REACT_APP_API_URL}${posterData.picture}`}
              src={posterData.picture}
              alt=""
            />
            <h3>{posterData.pseudo} </h3>
          </div>
        </div>
      )}
      {fromType === "comment-card" && (
        <div className="user-mini-data">
          <div className="user-data">
            <img
              // src={`${process.env.REACT_APP_API_URL}${posterData.picture}`}
              src={posterData.picture}
              alt=""
            />
            <h3>{posterData.pseudo} </h3>
          </div>
        </div>
      )}
      {fromType === "feed" && (
        <Link to={`/profil/${posterData._id}`} state={{ from: origin }}>
          <div className="user-mini-data">
            <div className="user-data">
              <img
                // src={`${process.env.REACT_APP_API_URL}${posterData.picture}`}
                src={posterData.picture}
                alt=""
              />
              <h3>{posterData.pseudo}</h3>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default UserMiniData;
