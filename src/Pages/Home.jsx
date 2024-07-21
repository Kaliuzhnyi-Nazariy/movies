import { useDispatch, useSelector } from "react-redux";
import { getTopFilms, getTopTVSeries } from "../redux/movie/movieOperations";
import { Link } from "react-router-dom";
import {
  selectMovies,
  // selectMoviesPage
} from "../redux/movie/movieSellectors";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [picked, setPicked] = useState("movie");

  const results = useSelector(selectMovies);
  // const page = useSelector(selectMoviesPage);

  useEffect(() => {
    setPicked("movie");
    dispatch(getTopFilms(1));
  }, []);

  useEffect(() => {
    if (picked === "movie") {
      dispatch(getTopFilms(page));
    }
    if (picked === "tv-series") {
      dispatch(getTopTVSeries(page));
    }
  }, [picked, page]);

  const movieHandle = () => {
    dispatch(getTopFilms(1));
    setPage(1);
    setPicked("movie");
  };

  const tvSeriesHandle = () => {
    dispatch(getTopTVSeries(1));
    setPage(1);
    setPicked("tv-series");
  };

  const addPage = () => {
    setPage((prevState) => prevState + 1);
    // dispatch(getTopTVSeries(page));
  };

  const minusPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <button type="button" onClick={movieHandle}>
        Movie
      </button>
      <button type="button" onClick={tvSeriesHandle}>
        TVSeries
      </button>

      <p>
        <b>Picked: </b>
        {picked}
      </p>
      <button type="button" onClick={minusPage}>
        Back
      </button>
      <p>{page}</p>
      <button type="button" onClick={addPage}>
        Load More
      </button>

      <>
        {results ? (
          <>
            {results.map((result) => {
              return (
                <>
                  <Link to={`movies/${result.id}`} key={result.id}>
                    <h2>{result.title || result.name}</h2>
                    <p>{result.overview}</p>
                  </Link>
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default Home;
