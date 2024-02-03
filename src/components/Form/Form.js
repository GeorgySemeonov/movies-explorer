import React from "react";
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from "../../images/logo.svg";
import "./Form.css";
import '../../vendor/hover.css';
import { useForm } from 'react-hook-form';
import { useCallback, useState, useEffect } from 'react';

function Form({ nameForm, title, buttonText, linkText, bottomText,onSubmit }) {
  

  const { register, handleSubmit,
 } = useForm();

   const [values, setValues] = useState({});
   const [errors, setErrors] = useState({});
   const [isValid, setIsValid] = useState({});
   const [isInputs, setisInputs] = React.useState(false);

//    var validateEmail = function(emailValue) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(emailValue)
// };


const resetForms = useCallback(
  (updatedValues = {}, updatedErrors = {}, updatedIsValid = false) => {
    setValues(updatedValues);
    setErrors(updatedErrors);
    setIsValid(updatedIsValid);
    
  },
  [setValues, setErrors, setIsValid]
);

// React.useEffect(() => {
  
//   setIsValid(!Object.values(errors).some((err) => err.length >= 0));
// }, [errors]);

useEffect(() => {
 resetForms();
}, [resetForms]);




const patternName = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
const patternPassword = /^[0-9a-zA-Z\sёЁ_\.\- ].{6,}/i;
const patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

const errorMessages = {
    name: "Недопустимый символ.",
    email: "Некорректный адрес электронной почты.",
    password:
      "Пароль не соответствует требованиям.",
};


React.useEffect(() => {
  
  setIsValid(!Object.values(errors).some((err) => err.length !== 0));
}, [errors]);

function errMessage({name, value}) {
    if (name === "name" && value.length >= 2 && !patternName.test(value)) {
        setErrors({...errors, [name]: errorMessages[name]});
        // setIsValid(!Object.values(errors).some((err) => err.length >= 0));
    } else if (name === "email" && value.length >= 2 && !patternEmail.test(value)) {
        setErrors({...errors, [name]: errorMessages[name]})
        
        // setIsValid(!Object.values(errors).some((err) => err.length >= 0));
    } else if (name === "password" && value.length >= 7 && !patternPassword.test(value)) {
        setErrors({...errors, [name]: errorMessages[name]})
    }
}


React.useEffect(() => {
  checkInputs();
},// eslint-disable-next-line
[values]);

function checkInputs () {
  if ((values.name && values.email && values.password) !== undefined) {
      setisInputs(true);
  } else {
      setisInputs(false);
  }
}

// console.log(isInputs);
// console.log(isValid);

// function handleValid() {
// //  setIsValid(evt.target.closest('form').checkValidity());
//    setIsValid(!Object.values(errors).some((err) => err.length !== 0));

//  }


   function handleChange(evt) {
    //  const name = evt.target.name;
    //  const value = evt.target.value;
    const { name, value } = evt.target;
     setValues({ ...values, [name]: value });
     setErrors({ ...errors, [name]: evt.target.validationMessage });
    //  setIsValid(!Object.values(errors).some((err) => err.length !== 0));
    
    // setIsValid(!Object.values(errors).some((err) => err.length >= 0));
    // setIsValid(evt.target.closest('form').checkValidity());
     errMessage({ name, value });
     
   }

  return (

    <div className="form__container">
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-top">
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <p className="form__title">{title}</p>
      </div>
      <fieldset className="form__inputs-register">
        {nameForm === 'signup' && (
          <label className="form__label">
            <span className="form__label_title">Имя</span>


            <input

{...register('name', {
  required: true,
  pattern: /^[A-Za-zА-Яа-яЁё /s -]+$/,
})}
          type="text"
          name="name"
          className="form__inputs-item"
          onChange={handleChange}
          value={values.name || ''}
          placeholder="Имя"
          minLength="2"
          maxLength="30"
          // pattern="/^[A-Za-zА-Яа-яЁё /s -]+$/v"
          required
        ></input>


<span className="form__inputs-error">
{errors.name || ''}
              </span>

          </label>
        )}

        <label className="form__label">
          <span className="form__label_title">E-mail</span>

          <input
         // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      //    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      //   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      //  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
{...register('email', {
  required: true,
  // pattern:patternEmail,
})}


          type="email"
          name="email"
          className={ `form__inputs-item ${errors.email ? "form__inputs-item_invalid" : ""}`}
          onChange={handleChange}
          value={values.email || ''}
          //  pattern={"/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/"}
          placeholder="E-mail"
          minLength="6"
          required
        />


<span className="form__inputs-error">
{errors.email || ''}
            </span>

        </label>

        <label className="form__label">
          <span className="form__label_title">Пароль</span>

          <input
            {...register('password', {
              required: true,
            })}


          type="password"
          name="password"
          className="form__inputs-item"
          onChange={handleChange}
          value={values.password || ''}
          placeholder="Пароль"
      
          maxLength="30"
          minLength="6"
          required
        />

<span className="form__inputs-error">
{errors.password || ''}
            </span>

        </label>
      </fieldset>
      <div className="form__bottom">
        <button
          type="submit"
          className={`button__sumbit 
          hover
          
          ${!isValid  ? '  button__sumbit_disable' : ''}

          ${!isInputs ? '  button__sumbit_disable' : ''}
         `}

          disabled={!isValid  }
        >
          {buttonText}
        </button>
        <div className="form__bottom-signin">
          <p className="form__bottom-text">{bottomText}</p>
          {nameForm === 'signup' && (
            <Link to="/sign-in" className="form__bottom-link hover">
              {linkText}
            </Link>
          )}
          {nameForm === 'signin' && (
            <Link to="/sign-up" className="form__bottom-link hover">
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </form>

    <Route exact path="/profile">
      <form className="form">
        <div className="form-top">
          <p className="form__title">{title}</p>
        </div>
      </form>
    </Route>
  </div>


    //__________________________________________________________

//     <div className="form__container">

//       <form className="form">

//         <div className="form-top">
//           <Link to="/">
//             <img className="header__logo" src={logo} alt="логотип" />
//           </Link>
//           <p className="form__title">{title}</p>
//         </div>

//         <fieldset className="form__inputs-register">

//         {nameForm === 'signup' && (
//           <label className="form__label">
//             <span className="form__label_title">Имя</span>
//             <input
//               type="name"
//               className="form__inputs-item"
//               placeholder="Имя"
//             ></input>
//           </label>
//  )}
//           <label className="form__label">
//             <span className="form__label_title">E-mail</span>
//             <input
//               type="email"
//               className="form__inputs-item"
//               placeholder="E-mail"
//             />

//             <span className="form__inputs-error">
//               Добавьте, пожалуйста, ваш E-mail
//             </span>
//           </label>

//           <label className="form__label">
//             <span className="form__label_title">Пароль</span>
//             <input
//               type="password"
//               className="form__inputs-item"
//               placeholder="Пароль"
//             />
//           </label>
//         </fieldset>


//         <div className="form__bottom">
//           <button type="submit" className={`button__sumbit`}>
//             {buttonText}
//           </button>
//           <div className="form__bottom-signin">
//             <p className="form__bottom-text">{bottomText}</p>
//             {nameForm === "signup" && (
//               <Link to="/signin" className="form__bottom-link hover">
//                 {linkText}
//               </Link>
//             )}
//             {nameForm === "signin" && (
//               <Link to="/signup" className="form__bottom-link hover">
//                 {linkText}
//               </Link>
//             )}
//           </div>
//         </div>


//       </form>

//     </div>
  );
}

export default Form;
