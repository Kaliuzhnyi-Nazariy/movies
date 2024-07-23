import { useDispatch, useSelector } from "react-redux";
import {
  genresMovies,
  getTopFilms,
  getTopTVSeries,
} from "../redux/movie/movieOperations";
import { Link, useLocation } from "react-router-dom";
import {
  // selectMovieGenres,
  selectMovies,
  // selectMoviesPage
} from "../redux/movie/movieSellectors";
import { useEffect, useState } from "react";
import SwitchExample from "../Components/ToggleSwitcher";
import {
  // authenticateRequestToken,
  createRequestToken,
  createSession,
  guestMode,
} from "../redux/user/userOperations";
// import { selectUserToken } from "../redux/user/userSellectors";

const Home = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const [page, setPage] = useState(1);
  const [picked, setPicked] = useState(null);

  const results = useSelector(selectMovies);
  // const page = useSelector(selectMoviesPage);

  // const token = useSelector(selectUserToken);

  useEffect(() => {
    dispatch(guestMode());
    dispatch(createRequestToken());
  }, []);

  const setPageInLS = (pageNumber) => localStorage.setItem("page", pageNumber);

  useEffect(() => {
    dispatch(genresMovies());
  }, [dispatch]);

  useEffect(() => {
    // setPicked("movie");
    if (
      !localStorage.getItem("picked") &&
      isNaN(localStorage.getItem("page"))
    ) {
      setPage(1);
      dispatch(getTopFilms(1));
    }
    if (
      !localStorage.getItem("picked") &&
      !isNaN(localStorage.getItem("page"))
    ) {
      localStorage.setItem("picked", "movie");
      setPage(1);
      dispatch(getTopFilms(1));
    }
    if (isNaN(localStorage.getItem("page"))) {
      setPage(1);
    } else {
      setPage(localStorage.getItem("page"));
    }

    setPicked(localStorage.getItem("picked"));
  }, []);

  // const genres = useSelector(selectMovieGenres);

  useEffect(() => {
    if (picked === "movie") {
      localStorage.setItem("picked", "movie");
      setPage(localStorage.getItem("page"));

      dispatch(getTopFilms(Number(page)));
    }
    if (picked === "tv-series") {
      localStorage.setItem("picked", "tv-series");
      setPage(localStorage.getItem("page"));

      dispatch(getTopTVSeries(Number(page)));
    }
  }, [picked, page]);

  const movieHandle = () => {
    dispatch(getTopFilms(1));
    setPage(1);
    setPageInLS(1);
    setPicked("movie");
  };

  const tvSeriesHandle = () => {
    dispatch(getTopTVSeries(1));
    setPage(1);
    setPageInLS(1);
    setPicked("tv-series");
  };

  const addPage = () => {
    setPage((prevState) => {
      prevState + 1;
      setPageInLS(Number(prevState) + 1);
    });

    // dispatch(getTopTVSeries(page));
  };

  const minusPage = () => {
    if (page > 1) {
      setPage((prevPage) => {
        prevPage - 1;
        setPageInLS(prevPage - 1);
      });
    }
  };

  const handleReg = () => {
    const query = new URLSearchParams(location.search);
    const requestToken = query.get("request_token");
    const approved = query.get("approved");

    if (approved === "true" && requestToken) {
      dispatch(createSession({ requestToken })).then(() => {
        history.push("/"); // Redirect to home or another page after session creation
      });
    } else {
      dispatch(guestMode());
      const redirectTo = `${window.location.origin}/movies-app/`; // Adjust the redirect path as needed
      dispatch(createRequestToken({ redirectTo }));
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
      <button onClick={handleReg}>reg</button>
      <p>
        <b>Picked: </b>
        {picked}
      </p>

      <SwitchExample type={picked} />

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
                  {picked === "movie" ? (
                    <Link
                      to={`movies/${result.id}`}
                      key={result.id}
                      state={{ from: location }}
                    >
                      <h2>{result.title}</h2>
                      <p>{result.overview}</p>
                    </Link>
                  ) : (
                    <Link
                      to={`tvseries/${result.id}`}
                      key={result.id}
                      state={{ from: location }}
                    >
                      <h2>{result.name}</h2>
                      <p>{result.overview}</p>
                    </Link>
                  )}
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
