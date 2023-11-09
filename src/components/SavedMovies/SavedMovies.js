import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';


import Preloader from '../Preloader/Preloader';
import searchFilter from '../../utils/Filter';
import mainApi from '../../utils/MainApi';

import {errors} from '../../utils/errors';

function SavedMovies() {

  const [movies, setMovies] = React.useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  ); 
  const [isLoading, setIsLoading] = React.useState(false); 
  const [error, setError] =React.useState('');

  const handleSearch = (query, isShort) => {
    setIsLoading(true);
    setError('');
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const filtered = searchFilter(savedMovies, query, isShort);
    if (filtered.length === 0) {
      setError('Ничего не найдено');
    }
    setMovies(filtered);
    setIsLoading(false);
  };

  React.useEffect(() => {
    setIsLoading(true);
    mainApi
      .getUsersMovies()
      .then((savedMovies) => {
        const user = localStorage.getItem('userId');
        const userMovies = savedMovies.filter((film) => film.owner === user);
        localStorage.setItem('savedMovies', JSON.stringify(userMovies)); 
        setMovies(userMovies);
        setIsLoading(false);
        if (savedMovies.length === 0) {
          setError('Вы еще ничего не добавили в избранное');
        }
      })
      .catch((err) => {
        setError(errors(err));
      });
  }, []);

  return (

    <main>

<div className="movies">
      <SearchForm handleSearch={handleSearch} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies} error={error} />
      )}
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