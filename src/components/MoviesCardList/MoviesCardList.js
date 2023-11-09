import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';
import "./MoviesCardList.css";
import '../../vendor/hover.css';

function MoviesCardList({ movies, error }) {

  const [maxMovies, setMaxMovies] = React.useState(0); //
  const [step, setStep] = React.useState(0);
  const location = useLocation();

  const showMoreMovies = () => {
    setMaxMovies(maxMovies + step);
  };

  const setMoviesRules = () => {
    const width = window.innerWidth;
    if (location.pathname === '/saved-movies') {
      setMaxMovies(movies.length);
    }
    if (width <= 720) {
      setMaxMovies(5);
      setStep(2);
    } else if (width <= 1000) {
      setMaxMovies(8);
      setStep(2);
    } else if (width <= 1279) {
      setMaxMovies(12);
      setStep(3);
    } else {
      setMaxMovies(12);
      setStep(4);
    }
  };

  React.useEffect(() => {
    setMoviesRules();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        setMoviesRules();
      }, 500);
    });
  }, []);

  return (

    <section className="movies__cards-section">
    {error ? (
      <span className='movies__error'>{error}</span>
    ) : (
      <>
        {movies.map((movie, index) => {
          if (index < maxMovies) {
            return (
              <MoviesCard key={movie.id || movie.movieId} movie={movie} />
            );
          }
          return null;
        })}
      </>
    )}
    {movies.length > maxMovies && location.pathname !== '/saved-movies' && (
      <button className="movies__more-button hover" onClick={showMoreMovies}>
        Еще
      </button>
    )}
  </section>

    //____________________________________________
    // <>
    //   <section className="movies__cards-section">
    //     <>
    //       <MoviesCard />
    //       <MoviesCard />
    //       <MoviesCard />
    //       <MoviesCard />
    //       <MoviesCard />
    //       <MoviesCard />
    //       <MoviesCard />
    //       <MoviesCard />
    //       <MoviesCard />
    //     </>
    //   </section>{" "}
    //   <button className="movies__more-button hover" >
    //     Еще
    //   </button>
    // </>
  );
}

export default MoviesCardList;
