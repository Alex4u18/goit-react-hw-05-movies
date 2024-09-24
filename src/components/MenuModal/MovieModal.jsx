import PropTypes from 'prop-types';
import styles from './MovieModal.module.css';

function MovieModal({ movie, onClose, onMovieDetailsClick }) {
  const handleClickOutside = event => {
    if (event.target.classList.contains(styles.modalBackdrop)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleClickOutside}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <button
          onClick={onMovieDetailsClick}
          className={styles.movieDetailsButton}
        >
          Movie Details
        </button>
        <h2 className={styles.movieTitle}>{movie.title}</h2>
        <p className={styles.movieOverview}>{movie.overview}</p>
        <p className={styles.movieReleaseDate}>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
      </div>
    </div>
  );
}

MovieModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onMovieDetailsClick: PropTypes.func.isRequired,
};

export default MovieModal;
