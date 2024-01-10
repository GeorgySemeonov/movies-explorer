import React from "react";
import "./Profile.css";
import "../Form/Form.css";
import '../../vendor/hover.css';
import  {CurrentUserContext}  from '../../contexts/CurrentUserContext';
import { useCallback, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import mainApi from '../../utils/MainApi';

function Profile({ handleLogout }) {


const { user: currentUser, updateUser } = React.useContext(CurrentUserContext);
// const { name, email } = currentUser;

const [isEditData, setIsEditData] = React.useState(false); 
const [errorEdit, setErrorEdit] = React.useState(false); 
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [isActiveEdit, setIsActiveEdit] = React.useState(false);
  const [isUserDataChanged, setUserDataChanged] = React.useState(false);

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState({});
  
  const [names, setNames] = React.useState('');
  // function handleChange(evt) {
  //   setIsActiveEdit(true);
  //   const name = evt.target.name;
  //   const value = evt.target.value;
  //   setValues({ ...values, [name]: value.name });
  //   setErrors({ ...errors, [name]: evt.target.validationMessage });
  //   setIsValid(evt.target.closest('form').checkValidity());
  // }
  const resetForms = useCallback(
    (updatedValues = {}, updatedErrors = {}, updatedIsValid = false) => {
      setValues(updatedValues);
      setErrors(updatedErrors);
      setIsValid(updatedIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  useEffect(() => {
    if (currentUser.name !== name || currentUser.email !== email) {
      setIsEditData(false);
    } else {
      setIsActiveEdit(false);
    }
  }, [currentUser, name, email]);

  // useEffect(() => {
  //   setName(currentUser.name);
  //   setEmail(currentUser.email);
  // }, [currentUser]);

  useEffect(() => {
    values.name === name && values.email === email
      ? setUserDataChanged(false)
      : setUserDataChanged(true);
  }, [values]);

  useEffect(() => {
    setName(currentUser.name);
   setEmail(currentUser.email);
    resetForms(currentUser, {}, true);
  }, [currentUser, resetForms]);


///_____________________________________________________________________________
 



  const handelEditProfile = ({ name, email }) => {
    mainApi
      .saveUserInfo({ name, email })
      .then((userData) => {
        setIsEditData(true);
        setErrorEdit(false);
      })
      .catch(() => {
        setErrorEdit(true);
      })
      .finally(() => {
        setErrorEdit(false);
      });
  };

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   handelEditProfile({ name, email }); 
  // };

//-________________________________________________________________________

  const handleSubmitProfile = (e) => {
    e.preventDefault();
   
    if (name !== currentUser.name || email !== currentUser.email) {
      setIsActiveEdit(true);
      handelEditProfile({ name, email }); 
      updateUser({ name, email }); 
    } else {
      setIsActiveEdit(false); 
    }
  };

  // function handleChange(event) {
  
  //   const name = evt.target.name;
  //   const value = evt.target.value;
  //   setValues({ ...values, [name]: value });
  //   setErrors({ ...errors, [name]: evt.target.validationMessage });
  //   setIsValid(evt.target.closest('form').checkValidity());
  // }
  

  function handleChange(evt) {
    setIsActiveEdit(true);
    setIsEditData(false);
    setNames(evt.target.value);
    const input = evt.target;
    setNames(input.value);

    // const name = evt.target.name;
    // const value = evt.target.value;
    // setValues({ ...values, [name]: value.name });
    // setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
  }

  function handleNameChange(event) {
    setIsActiveEdit(true);
    setIsEditData(false);
    setName(event.target.value);
    const input = event.target;
    setName(input.value);
    setIsValidName(input.validity.valid);
    setIsValid(event.target.closest('form').checkValidity());
    if (!isValidName) {
      setErrorName(input.validationMessage);
    } else {
      setErrorName('');
    }
  }

  function handleEmailChange(event) {
    setIsActiveEdit(true);
    setEmail(event.target.value);
    const input = event.target;
    setEmail(input.value);
    setIsValidEmail(input.validity.valid);
    setIsValid(event.target.closest('form').checkValidity());
    if (!isValidEmail) {
      setErrorEmail(input.validationMessage);
    } else {
      setErrorEmail('');
    }
  }

  return (

<div className="profile">
     
      <div className="profile__content">
        <p className="form-profile__title">{`Привет, ${currentUser.name}!`}</p>

        <form
          id="profile"
          className="form-profile"
          onSubmit={handleSubmitProfile}
          noValidate
        >
          <fieldset className="form__inputs-register">
            <label className="form__label form__label_profile">
              <span className="form__label_title form__label_title_profile">
                Имя
              </span>
              <input

                type="name"
                className="form__inputs-item form__inputs-item_profile"
                minLength={2}
                maxLength={35}
                placeholder="Имя"
                id="name"
                value={name || ''}
                onChange={handleNameChange}
                required
              ></input>
              <span className="form__inputs-error form__inputs-error_profile">
               {errorName}
              </span>
            </label>

            <label className="form__label form__label_profile">
              <span className="form__label_title form__label_title_profile">
                E-mail
              </span>
              <input

                type="email"
                className="form__inputs-item_profile form__inputs-item_profile_last"
                placeholder="E-mail"
                required
                value={email || ''}
                onChange={handleEmailChange}
              />
              <span className="form__inputs-error form__inputs-error_profile ">
                {errorEmail}
              </span>
            </label>
          </fieldset>
        </form>

        <div className="profile__links">
          {errorEdit && (
            <span className="profile__links-item profile__edit-message">
              Что-то пошло не так...
            </span>
          )}
          {isEditData && (
            <span className="profile__links-item profile__edit-message">
              Данные успешно сохранены!
            </span>
          )}
 {/* <button className={`profile__button-edit link ${!isUserDataChanged || !isValid ? 'profile__button-edit_disabled' : ''}`} type="submit" disabled={!isUserDataChanged || !isValid}>Редактировать</button> */}
          <button
            type="submit"
            form="profile"
           
          //  disabled={!isUserDataChanged || !isValid }
           disabled={!isActiveEdit || !isValid }
            className={`profile__links-item ${isActiveEdit && 'hover profile__edit-message_active'}`}
            // profile__links-item_disabled
            // className={`profile__links-item ${!isUserDataChanged || isValid ? '' : 'hover'}  `}
           
          >
            Редактировать
          </button>
          <button
            className="profile__links-item profile__links-item_signout hover"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>


    //_____________________________________________________

    // <section className="profile">
      

    //   <div className="profile__content">
    //     <p className="form-profile__title">{`Привет, ${currentUser.name}!`}</p>

    //     <form
    //       id="profile"
    //       className="form-profile"
    //       onSubmit={handleSubmitProfile}
    //       noValidate
    //     >
    //       <fieldset className="form__inputs-register">
    //         <label className="form__label form__label_profile">
    //           <span className="form__label_title form__label_title_profile">
    //             Имя
    //           </span>
    //           <input
    //             type="name"
    //             className="form__inputs-item form__inputs-item_profile"
    //             minLength={2}
    //             maxLength={35}
    //             placeholder="Имя"
    //             id="name"
    //             value={name || ''}
    //             onChange={handleNameChange}
    //             required
    //           ></input>
    //           <span className="form__inputs-error form__inputs-error_profile">
    //             {errorName}
    //           </span>
    //         </label>

    //         <label className="form__label form__label_profile">
    //           <span className="form__label_title form__label_title_profile">
    //             E-mail
    //           </span>
    //           <input
    //             type="email"
    //             className="form__inputs-item_profile form__inputs-item_profile_last"
    //             placeholder="E-mail"
    //             required
    //             value={email || ''}
    //             onChange={handleEmailChange}
    //           />
    //           <span className="form__inputs-error form__inputs-error_profile ">
    //             {errorEmail}
    //           </span>
    //         </label>
    //       </fieldset>
    //     </form>

    //     <div className="profile__links">
    //       {errorEdit && (
    //         <span className="profile__links-item profile__edit-message">
    //           Ошибка , что то не так
    //         </span>
    //       )}
    //       {isEditData && (
    //         <span className="profile__links-item profile__edit-message">
    //           Успешно сохранено
    //         </span>
    //       )}

    //       <button
    //         type="submit"
    //         form="profile"
    //         disabled={!isActiveEdit}
    //         className={`profile__links-item ${isActiveEdit && 'hover'}`}
    //       >
    //         Редактировать
    //       </button>
    //       <button
    //         className="profile__links-item profile__links-item_signout hover"
          
    //       >
    //         Выйти из аккаунта
    //       </button>
    //     </div>
    //   </div>
    // </section>
  );
}

export default Profile;




 
