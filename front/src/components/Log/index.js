import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = ({ signIn, signUp }) => {
  const [signUpModal, setSignUpModal] = useState(signUp);
  const [signInModal, setSignInModal] = useState(signIn);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connection-section">
      <div className="connection-container">
        <ul className="selection">
          <li
            id="register"
            onClick={handleModals}
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            id="login"
            onClick={handleModals}
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
