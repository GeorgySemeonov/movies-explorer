import React from "react";
import Form from "../Form/Form";


function Login({ title, buttonText, linkText, bottomText ,userLogin }) {

  return (
    <Form
      nameForm="signin"
      onSubmit={userLogin}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
  );
}

export default Login;
