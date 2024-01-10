import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';


import Preloader from '../Preloader/Preloader';
import searchFilter from '../../utils/Filter';
import mainApi from '../../utils/MainApi';

import {errors} from '../../utils/errors';

function SavedMovies() {

  const [isLoading, setIsLoading] = React.useState(false); 
  const [movieError, setMovieError] =React.useState('');
  const [saveMovies, setSaveMovies] = React.useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  ); 
  
  const savedMovieSearcher = (query, isShort) => {
    setIsLoading(true);
    setMovieError('');
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const filtered = searchFilter(savedMovies, query, isShort);
    if (filtered.length === 0) {
      setMovieError('Ничего не найдено');
    }
    setSaveMovies(filtered);
    setIsLoading(false);
  };

  React.useEffect(() => {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        const userId = localStorage.getItem('userId');
        const userMovies = savedMovies.filter((film) => film.owner === userId);
        localStorage.setItem('savedMovies', JSON.stringify(userMovies)); 
        setSaveMovies(userMovies);
        setIsLoading(false);
        if (savedMovies.length === 0) {
          setMovieError('Вы еще ничего не добавили в избранное');
        }
      })
      .catch((err) => {
        setMovieError(errors(err));
      });
  }, []);

  return (

    <main>

<div className="movies">
      <SearchForm handleSearch={savedMovieSearcher} />
      {isLoading ? (<Preloader />) : (<MoviesCardList saveMovies={saveMovies} movieError={movieError} />)}
    </div>




{/*       
    <section className="movies">
      <SearchForm />
        <MoviesCardList/>
    
    </section> */}


    </main>


  );
}

export default SavedMovies;