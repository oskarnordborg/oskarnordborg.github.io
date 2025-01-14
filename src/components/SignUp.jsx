import React from "react";
import "./SignUp.css";

const SignUp = ({ pageData }) => {
  if (!pageData) {
    return null;
  }
  return (
    <div className="section">
      <h1 className="signup-h1">
        {pageData.signup_header || "signup.signup_header"}
      </h1>
      {pageData.signup_text && <p>{pageData.signup_text}</p>}
      <iframe
        title="Anmälan 2025"
        src="https://docs.google.com/forms/d/e/1FAIpQLSdmjJxhSOAVM8diVJxjORkNEYg0JX0Jk-iA8U56SAWxXA141w/viewform"
      ></iframe>
    </div>
  );
};

export default SignUp;
