import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import '../../vendor/hover.css';
import { useLocation } from 'react-router-dom';

function SearchForm({ handleSearch }) {

  const [shorts, setShorts] = React.useState(false); 
  const [placeholderContent, setPlaceholderContent] = React.useState('Фильм'); 
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const { pathname } = useLocation();

  const handeleInput = (evt) => {
    setInputValue(evt.target.value);
  };

  const handelCheckbox = () => {
    setShorts(!shorts);
    handleSearch(inputValue, !shorts);
    if (pathname === '/movies') {
      localStorage.setItem('shorts', !shorts);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
      setError(true);
      evt.target.elements['search-query'].focus();
      return;
    }
    setError(false);
    setPlaceholderContent('Movie');
    if (pathname === '/movies') {
      localStorage.setItem('query', inputValue);
    }
    handleSearch(inputValue, shorts);
  };

  React.useEffect(() => {
    if (pathname === '/movies') {
      const savedInputValue = localStorage.getItem('query');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));
      if (savedInputValue) {
        setInputValue(savedInputValue);
      }
      if (savedShorts) {
        setShorts(savedShorts);
      }
      if (savedInputValue || savedShorts === true) {
        handleSearch(savedInputValue, savedShorts);
      }
    }
  }, []);


  return (

    <div className="search-container">
    <form
      className="search-form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <input
        type="text"
        id="search-query"
        name="search-query"
        placeholder={placeholderContent}
        className="search-form__input"
        onChange={handeleInput}
        required
        value={inputValue}
      />
      <button
        type="submit"
        className="search-form__button hover"
        aria-label="Найти"
      >
        Найти
      </button>
      {error ? (
        <span className="search-form__inputs-error">
          Введите ключевое слово
        </span>
      ) : (
        <span className="search-form__inputs-error search-form__inputs-error_hidden">
          Введите ключевое слово
        </span>
      )}

<FilterCheckbox value={shorts} onChange={handelCheckbox} />
    </form>
    

  </div>

    //_____________________________________________________

    // <div className="search-container">
    //   <form className="search-form">
    //     <input
    //       type="text"
    //       name="search-query"
    //       className="search-form__input"
    //       placeholder="Фильм"
    //       required
    //     />
    //     <button
    //       type="submit"
    //       className="search-form__button hover"
    //       aria-label="Поиск"
    //     >
    //       Найти
    //     </button>
    //     <FilterCheckbox />
    //   </form>
    // </div>
  );
}

export default SearchForm;
