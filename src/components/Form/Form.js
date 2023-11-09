import React from "react";
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from "../../images/logo.svg";
import "./Form.css";
import '../../vendor/hover.css';
import { useForm } from 'react-hook-form';

function Form({ nameForm, title, buttonText, linkText, bottomText,onSubmit }) {
  
 const [name, setUserName] = React.useState('');
 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');

 const [isValidName, setIsValidName] = React.useState(false);
 const [isValidEmail, setIsValidEmail] = React.useState(false);
 const [isValidPassword, setIsValidPassword] = React.useState(false);

 const [errorName, setErrorName] =React.useState('');
 const [errorEmail, setErrorEmail] = React.useState('');
 const [errorPassword, setErrorPassword] = React.useState('');

 const {
   register,
   formState: { errors },
   handleSubmit,
 } = useForm();

 function handleNameChange(e) {
   const input = e.target;
   setUserName(input.value);
   setIsValidName(input.validity.valid);
   if (!isValidName) {
     setErrorEmail(input.validationMessage);
   } else {
     setErrorName('');
     
     // setIsDisabled(false);
   }
 }

 function handleEmailChange(event) {
   const input = event.target;
   setEmail(input.value);
   setIsValidEmail(input.validity.valid);
   if (!isValidEmail) {
     setErrorEmail(input.validationMessage);
   } else {
     setErrorEmail('');
   }
 }

 function handlePasswordChange(event) {
   setPassword(event.target.value);
   const input = event.target;
   setPassword(input.value);
   setIsValidPassword(input.validity.valid);
   if (!isValidPassword) {
     setErrorPassword(input.validationMessage);
   } else {
     setErrorPassword('');
   }
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
                onChange: (e) => handleNameChange(e),
                minLength: 2,
                maxLength: 35,
              })}
              type="name"
              className="form__inputs-item"
              placeholder="Имя"
              id="name"
              value={name || ''}
            ></input>
            {errors.name && errors.name.type === 'required' && (
              <span className="form__inputs-error">
                Добавьте, пожалуйста, имя
              </span>
            )}
            {errors.name && errors.name.type === 'minLength' && (
              <span className="form__inputs-error">
                Имя не бывает таким коротким
              </span>
            )}
          </label>
        )}

        <label className="form__label">
          <span className="form__label_title">E-mail</span>
          <input
            {...register('email', {
              required: true,
              onChange: (e) => handleEmailChange(e),
              pattern: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
            })}
            type="email"
            className="form__inputs-item"
            placeholder="E-mail"
            value={email || ''}
          />
          {errors.email && errors.email.type === 'required' && (
            <span className="form__inputs-error">
              Добавьте, пожалуйста, ваш E-mail
            </span>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <span className="form__inputs-error">
              E-mail написан с ошибкой
            </span>
          )}
        </label>

        <label className="form__label">
          <span className="form__label_title">Пароль</span>
          <input
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 35,
              onChange: (e) => handlePasswordChange(e),
            })}
            type="password"
            className="form__inputs-item"
            placeholder="Пароль"
            value={password || ''}
          />
          {errors.password && errors.password.type === 'required' && (
            <span className="form__inputs-error">
              Без пароля не получится, сорри
            </span>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <span className="form__inputs-error">
              Безопасный пароль включает не менее 6 символов
            </span>
          )}
          {errors.password && errors.password.type === 'maxLength' && (
            <span className="form__inputs-error">Слишком длинный пароль</span>
          )}
        </label>
      </fieldset>
      <div className="form__bottom">
        <button
          type="submit"
          className={`button__sumbit ${
            errors.name &&
            errors.password &&
            errors.email &&
            'button__sumbit_disable'
          } hover`}
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
