import React from "react";
import { Route, Switch } from 'react-router-dom';
import { useCallback } from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import mainApi from '../../utils/MainApi';
import { errors } from '../../utils/errors';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({}); 
  const [textError, setTextError] = React.useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [statusInfo, setStatusInfo] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true); 
  
  const updateCurrentUser = (updatedUserData) => {
    setCurrentUser(updatedUserData);
  };

  const onLogin = async ({ email, password }) => {
    try {
      const jwt = await mainApi.authorize({ email, password });
      if (jwt.token) {
        localStorage.setItem('jwt', jwt.token);
        const user = await mainApi.getUserInfo();
        if (user) {
          localStorage.setItem('userId', user.data._id);
          setCurrentUser(user.data);
          setLoggedIn(true);
          setStatusInfo(true);
          setTextError('Вы успешно вошли в аккаунт');
          history.push('/movies');
        }
      }
    } catch (err) {
      setTextError(errors(err));
      setStatusInfo(false);
    } finally {
      setInfoTooltipOpen(true);
    }
  };

  const auth = useCallback(
    async (jwt, realPath) => {
      return mainApi
        .getUserInfo(jwt)
        .then((user) => {
          if (user) {
            setLoggedIn(true);
            localStorage.setItem('id', user.data._id); 
            console.log('realPath', realPath);
            setCurrentUser(user.data);
            console.log(user.data)
            history.push(realPath);
          } else {
            setLoggedIn(false);
            history.push('/');
          }
        })
        .catch((err) => {
          setTextError(errors(err));
          setInfoTooltipOpen(true);
        });
    },
    [setLoggedIn, history]
  );

  React.useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        const realPath = location.pathname;
        setIsLoading(true);
        console.log(realPath);
        auth(jwt, realPath).finally(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setInfoTooltipOpen(false);
  }

  function handleLogout() {
    setCurrentUser({});
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  const onRegister = ({ name, email, password }) => {
    mainApi
      .register({ name, email, password })
      .then((data) => {
        if (data) {
          onLogin({ email, password });
          setTextError('Вы успешно зарегистрировались!');
        } else {
          history.push('/');
        }
      })
      .catch((err) => {
        setTextError(errors(err));
        setStatusInfo(false);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      });
  };

  return (

    <CurrentUserContext.Provider
    value={{ user: currentUser, updateUser: updateCurrentUser }}
  >
    <div className="page">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Route path="/" exact>
            <Header loggedIn={loggedIn} />
          </Route>
          <Route path="/movies" exact>
            <Header loggedIn={loggedIn} />
          </Route>
          <Route path="/saved-movies" exact>
            <Header loggedIn={loggedIn} />
          </Route>
          <Route path="/profile" exact>
            <Header loggedIn={loggedIn} />
          </Route>

          <Route exact path="/">
            <Main />
          </Route>
          <Switch>
            <Route exact path="/sign-in">
              <Login
                title="Рады видеть!"
                buttonText="Войти"
                linkText="Регистрация"
                bottomText="Ещё не зарегистрированы?"
                onLogin={onLogin}
              />
            </Route>
            <Route exact path="/sign-up">
              <Register
                title="Добро пожаловать!"
                buttonText="Зарегистрироваться"
                linkText="Войти"
                bottomText="Уже зарегистрированы?"
                onRegister={onRegister}
              />
            </Route>

            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
            />
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              handleLogout={handleLogout}
            />

            {location.pathname !== '/' && ( 
              <Route path="*">
                <PageNotFound />
              </Route>
            )}
          </Switch>

          <Route exact path={['/', '/movies', '/saved-movies']}>
            <Footer />
          </Route>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSucess={statusInfo}
            onClose={closeAllPopups}
            textError={textError}
          />
        </>
      )}
    </div>
  </CurrentUserContext.Provider>


  //_____________________________________________________________________________
//     <CurrentUserContext.Provider
//       value={{ user: currentUser, updateUser: updateCurrentUser }}
//     >
//       <div className="page">

//       <>

//             <Route path="/" exact>
//               <Header
              
//                 />
//             </Route>
//             <Route path="/movies" exact>
//               <Header 
             
//               />
//             </Route>
//             <Route path="/saved-movies" exact>
//               <Header 
             
//               />
//             </Route>
//             <Route path="/profile" exact>
//               <Header 
              
//               />
//             </Route>

//             <Route exact path="/">
//               <Main />
//             </Route>
//             <Switch>
//               <Route exact path="/signin">
//                 <Login
//                   title="Рады видеть!"
//                   buttonText="Войти"
//                   linkText="Регистрация"
//                   bottomText="Ещё не зарегистрированы?"
                 
//                 />
//               </Route>
//               <Route exact path="/signup">
//                 <Register
//                   title="Добро пожаловать!"
//                   buttonText="Зарегистрироваться"
//                   linkText="Войти"
//                   bottomText="Уже зарегистрированы?"
                  
//                 />
//               </Route>

//               <Route
//                 exact
//                 path="/movies"
                
//                 component={Movies}
//               />
//               <Route
//                 exact
//                 path="/saved-movies"
               
//                 component={SavedMovies}
//               />
//               <Route
//                 exact
//                 path="/profile"
                
//                 component={Profile}
//               />

             
//                 <Route path="/404">
//                   <PageNotFound />
//                 </Route>
              
//             </Switch>


//             <Route exact path={['/', '/movies', '/saved-movies']}>
//               <Footer />
//             </Route>
           
//           </>

// {/*         
//         <Routes>

//           <Route exact path="/" element={<Main />} />

//           <Route path="/movies" element={<Movies />} />
//           <Route exact path="/saved-movies" element={<Movies />} />

//           <Route
//             exact
//             path="/signin"
//             element={
//               <Login
//                 title="Рады видеть!"
//                 buttonText="Войти"
//                 linkText="Регистрация"
//                 bottomText="Ещё не зарегистрированы?"
//               />
//             }
//           />

//           <Route
//             exact
//             path="/signup"
//             element={
//               <Register
//                 title="Добро пожаловать!"
//                 buttonText="Зарегистрироваться"
//                 linkText="Войти"
//                 bottomText="Уже зарегистрированы?"
//               />
//             }
//           />

//           <Route exact path="/profile" element={<Profile />} />
//           <Route exact path="/404" element={<PageNotFound />} />
//         </Routes> */}
//       </div>
//     </CurrentUserContext.Provider>
  );
}

export default App;
