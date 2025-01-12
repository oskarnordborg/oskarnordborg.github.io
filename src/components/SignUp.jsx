import React from "react";
import "./SignUp.css";

const SignUp = ({ pageData }) => {
  if (!pageData) {
    return null;
  }
  return (
    <div className="section">
      <h1>{pageData.signup_header || "signup.signup_header"}</h1>
      <p>{pageData.signup_text || "signup.signup_text"}</p>
    </div>
  );
};

export default SignUp;
