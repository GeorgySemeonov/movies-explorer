import React from "react";
import Form from "../Form/Form";

function Login({ title, buttonText, linkText, bottomText, onLogin }) {
  return (
    <Form
      nameForm="signin"
      onSubmit={onLogin}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
  );
}

export default Login;
