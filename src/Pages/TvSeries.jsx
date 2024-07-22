import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { selectMovie } from "../redux/movie/movieSellectors";
import { useEffect } from "react";
import { findByIdTvSeries } from "../redux/movie/movieOperations";

const TvSeries = () => {
  const { tvSeries } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector(selectMovie);

  useEffect(() => {
    if (tvSeries) {
      dispatch(findByIdTvSeries({ tvSeries }));
    }
  }, [dispatch, tvSeries]);

  const location = useLocation();
  const backLink = location.state?.from.pathname ?? "/";

  return (
    <div>
      <Link to={backLink}>back</Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={150}
        />
        <h2>{movie.name}</h2>
      </div>
    </div>
  );
};

export default TvSeries;
