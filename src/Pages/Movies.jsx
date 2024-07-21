import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findById } from "../redux/movie/movieOperations";
import { selectMovie } from "../redux/movie/movieSellectors";

const Movies = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector(selectMovie);

  useEffect(() => {
    if (movieId) {
      dispatch(findById({ movieId }));
    }
  }, [dispatch, movieId]);

  return (
    <div>
      <Link to={`/movies`}>back</Link>
      <h2>{movie.title}</h2>
    </div>
  );
};

export default Movies;
