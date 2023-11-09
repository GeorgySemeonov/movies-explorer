import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import searchFilter from '../../utils/Filter';

import "./Movies.css";

function Movies() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(''); 

  React.useEffect(() => {
    const savedMovies = localStorage.getItem('savedMovies');
    if (!savedMovies) {
      setIsLoading(true);
      mainApi
        .getUsersMovies()
        .then((data) => {
          if (data.length > 0) {
            localStorage.setItem('savedMovies', JSON.stringify(data));
          }
          setIsLoading(false);
        })
        .catch(() => {
          setError("Ошибка. Проверьте подключение");
        });
    }
  }, []);

  const filter = (query, shorts) => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    const filtered = searchFilter(storedMovies, query, shorts);
    if (filtered.length === 0) {
      setError("Ничего не найдено");
    }
    setMovies(filtered);
    setIsLoading(false);
  };

  const handleSearch = (query, shorts) => {
    setIsLoading(true);
    
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (!storedMovies) {
      moviesApi
        .getAllMovies()
        .then((films) => {
          localStorage.setItem('movies', JSON.stringify(films));
          filter(query, shorts);
        })
        .catch(() => {
          setError("Ошибка. Проверьте подключение");
        });
    } else {
      filter(query, shorts);
    }
  };

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




    {/* <section className="movies">
      
      // <SearchForm />
      // <MoviesCardList />
 
    </section> */}
   

   </main>
  );
}

export default Movies;
