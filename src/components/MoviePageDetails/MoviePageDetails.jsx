import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MoviePageDetails.module.css';

function MoviePageDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=bd6ee6929486fe1c51144ccdadcdea1d`
      )
      .then(response => setMovie(response.data))
      .catch(error => console.log(error));
  }, [movieId]);

  const fetchCast = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bd6ee6929486fe1c51144ccdadcdea1d`
      )
      .then(response => setCast(response.data.cast))
      .catch(error => console.log(error));
  };

  const fetchReviews = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=bd6ee6929486fe1c51144ccdadcdea1d`
      )
      .then(response => setReviews(response.data.results))
      .catch(error => console.log(error));
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
    if (tab === 'cast') {
      fetchCast();
    } else if (tab === 'reviews') {
      fetchReviews();
    }
  };

  const handleGoBack = () => {
    if (location.state && location.state.from === 'movies') {
      navigate('/movies');
    } else {
      navigate('/home');
    }
  };

  if (!movie) {
    return <p className={styles.loadingMessage}>Loading...</p>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go Back
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className={styles.moviePoster}
      />
      <div className={styles.detailsSection}>
        <h2 className={styles.movieTitle}>{movie.title}</h2>
        <p className={styles.movieOverview}>{movie.overview}</p>
        <p className={styles.releaseDate}>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <div className={styles.tabButtons}>
          <button
            className={styles.tabButton}
            onClick={() => handleTabChange('cast')}
          >
            Cast
          </button>
          <button
            className={styles.tabButton}
            onClick={() => handleTabChange('reviews')}
          >
            Reviews
          </button>
        </div>

        {activeTab === 'cast' && (
          <div className={styles.castSection}>
            <h3 className={styles.sectionTitle}>Cast</h3>
            <ul className={styles.castList}>
              {cast.map(actor => (
                <li key={actor.cast_id} className={styles.castItem}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt={actor.name}
                    className={styles.actorImage}
                  />
                  <p className={styles.actorDetails}>
                    {actor.name} as {actor.character}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={styles.reviewsSection}>
            <h3 className={styles.sectionTitle}>Reviews</h3>
            <ul className={styles.reviewsList}>
              {reviews.map(review => (
                <li key={review.id} className={styles.reviewItem}>
                  <p className={styles.reviewAuthor}>
                    <strong>{review.author}</strong>
                  </p>
                  <p className={styles.reviewContent}>{review.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviePageDetails;
