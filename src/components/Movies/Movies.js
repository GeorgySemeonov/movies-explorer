import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import searchFilter from '../../utils/Filter';

import "./Movies.css";

function Movies() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [movieError, setMovieError] = React.useState(''); 

  // React.useEffect(() => {
  //   const savedMovies = localStorage.getItem('savedMovies');
  //   if (!savedMovies) {
  //     setIsLoading(true);
  //     mainApi
  //       .getSavedMovies()
  //       .then((data) => {
  //         if (data.length > 0) {
  //           localStorage.setItem('savedMovies', JSON.stringify(data));
  //         }
  //         setIsLoading(false);
  //       })
  //       .catch(() => {
  //         setMovieError("Ошибка. Проверьте подключение");
  //       });
  //   }
  // }, []);

  const moviesFilter = (query, shorts) => {
    // setMoviesRules();
    setIsLoading(true);
    setMovieError('');
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    const filteredMovies = searchFilter(storedMovies, query, shorts);
    if (filteredMovies.length === 0) {
      setMovieError("Ничего не найдено");
    }
    setSaveMovies(filteredMovies);
    setIsLoading(false);
    // setMoviesRules();
  };

  const movieSearcher = (query, isShort) => {
    
    setIsLoading(true);
    const moviesArray = JSON.parse(localStorage.getItem('movies'));
    if (!moviesArray) {
      moviesApi.getMovies()
        .then((films) => {
          localStorage.setItem('movies', JSON.stringify(films));
          moviesFilter(query, isShort);
          // // setMoviesRules();
          // setMoviesRules();
        })
        .catch(() => {
          setMovieError("Ошибка. Проверьте подключение");
        });
    } else {
    // console.log(setMoviesRules());  
      moviesFilter(query, isShort);
    }
  };
//  React.useEffect((query, isShort) => {

//    setIsLoading(true);
//     const moviesArray = JSON.parse(localStorage.getItem('movies'));
//     if (!moviesArray) {
//       moviesApi.getMovies()
//         .then((films) => {
//           localStorage.setItem('movies', JSON.stringify(films));
//           moviesFilter(query, isShort);
//         })
//         .catch(() => {
//           setMovieError("Ошибка. Проверьте подключение");
//         });
//     } else {
//       moviesFilter(query, isShort);
//     }
//   }, []);


  return (
    
<main>

<div className="movies">
      <SearchForm handleSearch={movieSearcher} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList saveMovies={saveMovies} movieError={movieError} />
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
