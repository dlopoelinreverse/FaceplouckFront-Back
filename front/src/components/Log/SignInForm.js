import React, { useRef } from "react";
import axios from "axios";

const SignInForm = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    // console.log(inputEmail.current.value, inputPassword.current.value);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      credentials: "include",
      withCredentials: true,
      data: {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sign-in-container">
      <form id="sign-up-form" onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          placeholder="Votre email"
          ref={inputEmail}
        />
        <div className="email error"></div>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          ref={inputPassword}
        />
        <div className="password error"></div>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default SignInForm;
