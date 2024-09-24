import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
          
function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=686954a6867702e2802dd31dcf4680f7`
      )
      .then(response => setReviews(response.data.results))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>
              <strong>{review.author}</strong>
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Reviews;
