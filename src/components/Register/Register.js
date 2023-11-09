import React from "react";
import Form from "../Form/Form";

function Register({ title, buttonText, linkText, bottomText, onRegister }) {
  return (
    <Form
      nameForm="signup"
      onSubmit={onRegister}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
  );
}

export default Register;
