import React from "react";
import Form from "../Form/Form";


function Register({ title, buttonText, linkText, bottomText,userReg,loggedIn }) {
  
  return (
//     <Switch>
// <Route exact path={['/', '/movies', '/saved-movies', '/profile','/sign-up']}>
// {!loggedIn && (

<Form
      nameForm="signup"
      onSubmit={userReg}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
    
    
    ) }
   
    {/* </Route>
    <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
{loggedIn && (<></>) }
   
    </Route>

    </Switch> */}
  // );
// }

export default Register;
