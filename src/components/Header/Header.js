import React from "react";
import { Link , Route, NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import logo from "../../images/logo.svg";
import "./Header.css";
import '../../vendor/hover.css';
import menuLogo from '../../images/burger-icon-main.svg';
import accountLogo from '../../images/profile.svg';

function Header({ loggedIn }) {
  const [activeBurger, setActiveBurger] = React.useState(false); 
  const location = useLocation();
  
  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }
 
  React.useEffect(() => {
    setActiveBurger(false);
  }, [location.pathname]);




  return (
    
    <header >
    <Route exact path="/">
      {!loggedIn && (

        <section className="header header-reg">

          <Link to="/">
            <img className="header__logo" src={logo} alt="логотип" />
          </Link>
          <ul className="header__links">
            <li className="header__link-item">
              <Link to="/sign-up" className="header__link hover">
                Регистрация
              </Link>
            </li>
            <li className="header__link-item header__link-item_login">
              <Link to="/sign-in" className="header__link hover">
                Войти
              </Link>
            </li>
          </ul>

        </section>
      )}
    </Route>

    <Route path={['/movies', '/saved-movies', '/profile', '/']}>
      {loggedIn && (
        
        <section className="header ">
          <Link to="/">
            <img className="header__logo" src={logo} alt="логотип" />
          </Link>
          <nav className="header__links-movies">
            <NavLink
              exact
              to="/movies"
              className="header__link header__link_auth hover"
              activeClassName="header__link_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              exact
              to="/saved-movies"
              className="header__link header__link_auth hover"
              activeClassName="header__link_active"
            >
              Сохрененные фильмы
            </NavLink>
          </nav>

          <Link to="/profile" className="profile-button-wraper">
          <input className="profile-button hover"
                   onClick={handleActiveBurger}
                    type="image" src={accountLogo} border="0" alt="Аккаунт" />
            
          </Link>

          <img
            className="header__menu-icon hover"
            src={menuLogo}
            alt="иконка меню"
            onClick={handleActiveBurger}
          />
        </section>
      )}

      {activeBurger && (
        <section className="burger-menu-section">
          <div className="burger-menu">
            <button
              onClick={handleActiveBurger}
              type="button"
              className="burger-menu__button-close"
            ></button>
            <nav className="burger-menu__container">
              <ul className="burger-menu__list">
                <li className="burger-menu__list-item">
                  <NavLink
                    exact
                    to="/"
                    className="burger-menu__link hover"
                    activeClassName="burger-menu__link-active"
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="burger-menu__list-item">
                  <NavLink
                    exact
                    to="/movies"
                    className="burger-menu__link hover"
                    activeClassName="burger-menu__link-active"
                  >
                    Фильмы
                  </NavLink>
                </li>
                <li className="burger-menu__list-item">
                  <NavLink
                    exact
                    to="/saved-movies"
                    className="burger-menu__link hover"
                    activeClassName="burger-menu__link-active"
                  >
                    Сохранённые фильмы
                  </NavLink>
                </li>
              </ul>
            </nav>
            <Link className="profile-button-wraper-burger" to="/profile">
            <input className="profile-button hover"
              onClick={handleActiveBurger}
                   type="image" src={accountLogo} border="0" alt="Аккаунт лого" />
             
            </Link>
          </div>
        </section>
      )}
    </Route>
  </header>




//____________________________________________________________________

// <header >
// { location.pathname === '/' ? (

//       <Route  path={['/']}>
        
//           <section className="header header-reg">
         
//             <Link to="/">
//               <img className="header__logo hover" src={logo} alt="логотип" />
//             </Link>
//             <ul className="header__links">
//               <li className="header__link-item">
//                 <Link to="/signup" className="header__link hover">
//                   Регистрация
//                 </Link>
//               </li>
//               <li className="header__link-item header__link-item_login">
//                 <Link to="/signin" className="header__link hover">
//                   Войти
//                 </Link>
//               </li>
//             </ul>
            
//           </section>
         
//       </Route>
      
// ) : ( 

//       <Route path={['/movies', '/saved-movies', '/profile']}>
    
//           <section className="header ">

//             <Link to="/">
//               <img className="header__logo hover" src={logo} alt="логотип" />
//             </Link>
//             <nav className="header__links-movies">
//               <NavLink
//                 exact
//                 to="/movies"
//                 className="header__link header__link_auth hover"
//                 activeClassName="header__link_active"
//               >
//                 Фильмы
//               </NavLink>
//               <NavLink
//                 exact
//                 to="/saved-movies"
//                 className="header__link header__link_auth hover"
//                 activeClassName="header__link_active"
//               >
//                 Сохрененные фильмы
//               </NavLink>
//             </nav>

//             <Link to="/profile" className="profile-button-wraper">
//             <input className="profile-button hover"
//                   onClick={handleActiveBurger}
//                    type="image" src={accountLogo} border="0" alt="Аккаунт" />
             
//             </Link>

//             <img
//               className="header__menu-icon hover"
//               src={menuLogo}
//               alt="иконка меню"
//               onClick={handleActiveBurger}
//             />
//           </section>
      

//         {activeBurger && (
//           <section className="burger-menu-section">
//             <div className="burger-menu">
//               <button
//                 onClick={handleActiveBurger}
//                 type="button"
//                 className="burger-menu__button-close hover"
//               ></button>
//               <nav className="burger-menu__container">
//                 <ul className="burger-menu__list">
//                   <li className="burger-menu__list-item">
//                     <NavLink
//                       exact
//                       to="/"
//                       className="burger-menu__link hover"
//                       activeClassName="burger-menu__link-active"
//                     >
//                       Главная
//                     </NavLink>
//                   </li>
//                   <li className="burger-menu__list-item">
//                     <NavLink
//                       exact
//                       to="/movies"
//                       className="burger-menu__link hover"
//                       activeClassName="burger-menu__link-active"
//                     >
//                       Фильмы
//                     </NavLink>
//                   </li>
//                   <li className="burger-menu__list-item">
//                     <NavLink
//                       exact
//                       to="/saved-movies"
//                       className="burger-menu__link hover"
//                       activeClassName="burger-menu__link-active"
//                     >
//                       Сохранённые фильмы
//                     </NavLink>
//                   </li>
//                 </ul>
//               </nav>
//               <Link className="profile-button-wraper-burger" to="/profile">
//               <input className="profile-button hover"
//                   onClick={handleActiveBurger}
//                    type="image" src={accountLogo} border="0" alt="Аккаунт лого" />

            
//               </Link>
//             </div>
//           </section>
//         )}
//       </Route>
// )}
//     </header>

    // </section>


  );
}

export default Header;
