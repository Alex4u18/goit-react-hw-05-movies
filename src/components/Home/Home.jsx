import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import MovieModal from '../MenuModal/MovieModal';
import styles from './Home.module.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=686954a6867702e2802dd31dcf4680f7'
      )
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleMovieClick = movie => {
    setSelectedMovie(movie);
  };

  const handleMovieDetailsClick = () => {
    navigate(`/movies/${selectedMovie.id}`, { state: { from: 'home' } }); // Navighează la MoviePageDetails cu state: "home"
    setSelectedMovie(null);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1 className={styles.title}>Popular Movies</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.movieList}>
          {movies.map(movie => (
            <li
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
              <h2 className={styles.movieTitle}>{movie.title}</h2>
            </li>
          ))}
        </ul>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
          onMovieDetailsClick={handleMovieDetailsClick}
        />
      )}
    </div>
  );
}

Home.propTypes = {
  movie: PropTypes.object,
  onClose: PropTypes.func,
};

export default Home;
