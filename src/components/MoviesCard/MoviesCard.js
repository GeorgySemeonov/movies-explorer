import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import "../../vendor/hover.css";

import mainApi from '../../utils/MainApi';

function MoviesCard({ movie }) {
  

  const [isSaved, setIsSaved] = React.useState(false);
  const [savedId, setSavedId] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies) {
      savedMovies.forEach((savedMovie) => {
        if (savedMovie.movieId === movie.id || savedMovie._id === movie._id) {
          setIsSaved(true);
          setSavedId(savedMovie._id);
        }
      });
    }
  }, [movie._id, movie.id]);


  const handleMovieSaved = (evt) => {
    if (!isSaved) {
      const newMovie = {};
      const { image, id } = movie;

      Object.assign(newMovie, movie); 
      delete newMovie.id;
      delete newMovie.created_at;
      delete newMovie.updated_at;

      Object.entries(newMovie).forEach((key) => {
        if (!key[1]) {
          newMovie[key[0]] = '...';
        }
      });

      mainApi
        .movieLike({
          ...newMovie,
          image: `https://api.nomoreparties.co/${image.url}`,
          thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
          movieId: id,
        })
        .then((savedMovie) => {
          setIsSaved(true);
          setSavedId(savedMovie._id);
          let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          if (!savedMovies) {
            savedMovies = [];
          }
          savedMovies.push(savedMovie);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log('Что-то пошло не так...');
          } else {
            console.log('Нет соединения');
          }
        });
    } else { 
      mainApi
        .movieDisike(savedId)
        .then(() => {
          setIsSaved(false);
          const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        
          let index = 0;
          for (let i = 0; i < savedMovies.length; i += 1) {
            const film = savedMovies[i];
            if (film._id === movie._id) {
              index = i;
            }
          }
          savedMovies.splice(index, 1);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          if (location.pathname === '/saved-movies') {
            evt.target.closest('.movies-cards__item').remove();
          }
        })
        .catch((err) => console.log('error:', err));
    }
  };

  return (

<div className="movies-cards__item">
      <div className="movies-card__item-content">
        <img
          onClick={event =>  window.open(`${movie.trailerLink}`, '_blank')}
          className="movies-card__pic"
          alt={movie.image.name}
          src={
            location.pathname === '/movies'
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : movie.image
          }
        />

        <div className="movies-card__text">
          <h2 className="movies-card__title">{movie.nameRU}</h2>

          {location.pathname === '/saved-movies' ? (
          <button
            type="button"
            className="movies-card__like movies-card__like_type_selected hover"
            aria-label="лайк"
            onClick={handleMovieSaved}
          ></button>
        ) : (
          <button
            type="button"
            className={
              isSaved
                ? 'movies-card__like hover'
                : 'movies-card__like movies-card__like_type_notliked hover'
            }
            aria-label="лайк"
            onClick={handleMovieSaved}
          ></button>
        )}

          <p className="movies-card__description">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
        </div>
        
      </div>
    </div>

    //_______________________________________________________

    // <div className="movies-cards__item">
    //   <div className="movies-card__item-content">
    //     <img
    //       className="movies-card__pic"
    //       alt="Превью к вдео"
    //       src={
    //         " https://images.unsplash.com/photo-1697807713049-d171c4dd9d5e?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //       }
    //     />

    //     <div className="movies-card__text">
    //       <h2 className="movies-card__title">Film</h2>

    //       {location.pathname === "/saved-movies" ? (
    //         <button
    //           type="button"
    //           className="movies-card__like movies-card__like_type_selected hover"
    //           aria-label="лайк"
    //         ></button>
    //       ) : (
    //         <button
    //           type="button"
    //           className={"movies-card__like hover"}
    //           aria-label="лайк"
    //         ></button>
    //       )}

    //       <p className="movies-card__description">{`${Math.floor(120 / 60)}ч ${
    //         20 % 60
    //       }м`}</p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default MoviesCard;
