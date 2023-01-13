import React, { useState } from "react";
import Log from "./index";

const WelecomeModal = () => {
  const [userChoice, setUserChoice] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const handleChoice = (e) => {
    const id = e.target.id;
    if (id === "signup") {
      setSignUp(true);
      setSignIn(false);
      setUserChoice(id);
    } else if (id === "signin") {
      setSignUp(false);
      setSignIn(true);
      setUserChoice(id);
    }
  };

  return (
    <>
      {userChoice ? (
        <Log signUp={signUp} signIn={signIn} />
      ) : (
        <div className="welecome-modal">
          <div className="message-container">
            <p id="message">
              Bienvenu, avant de poursuivre vous pouvez soit vous inscrire en
              saisissant une adresse mail et un mot de passe, bien sûr les
              informations ne seront pas vérifiées, ou alors continuer avec le
              profil visiteur suivant :
            </p>
            <p id="profil">
              email : visiteur@gmail.com
              <br />
              Mot de passe :{" "}
            </p>
          </div>
          <div className="button-choice-container">
            <button id="signup" onClick={handleChoice}>
              S'inscrire
            </button>
            <button id="signin" onClick={handleChoice}>
              Se connecter
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WelecomeModal;
