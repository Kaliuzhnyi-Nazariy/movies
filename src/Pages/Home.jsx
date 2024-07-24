import { useDispatch, useSelector } from "react-redux";
import {
  genresMovies,
  getTopFilms,
  getTopTVSeries,
} from "../redux/movie/movieOperations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  // selectMovieGenres,
  selectMovies,
  // selectMoviesPage
} from "../redux/movie/movieSellectors";
import { useEffect, useState } from "react";
import SwitchExample from "../Components/ToggleSwitcher";
import {
  createAccessToken,
  // authenticateRequestToken,
  createRequestToken,
  // createSession,
  fetchAccountDetails,
  validateApiKey,
} from "../redux/user/userOperations";
import { selectUser } from "../redux/user/userSellectors";
// import { selectUserToken } from "../redux/user/userSellectors";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [picked, setPicked] = useState(null);

  const results = useSelector(selectMovies);

  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAccountDetails());
    console.log(user);
  }, [dispatch, user]);

  const setPageInLS = (pageNumber) => localStorage.setItem("page", pageNumber);

  useEffect(() => {
    dispatch(genresMovies());
  }, [dispatch]);

  useEffect(() => {
    const pickedFromLocalStorage = localStorage.getItem("picked");
    const pageFromLocalStorage = localStorage.getItem("page");

    if (!pickedFromLocalStorage && !pageFromLocalStorage) {
      localStorage.setItem("picked", "movie");
      localStorage.setItem("page", 1);
      setPage(1);
      setPicked("movie");
    } else if (pageFromLocalStorage) {
      localStorage.setItem("page", Number(pageFromLocalStorage));
      setPage(Number(pageFromLocalStorage));
    }

    setPicked(pickedFromLocalStorage || "movie");
  }, []);
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
  }, [picked, page, dispatch]);

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
  };

  const minusPage = () => {
    if (page > 1) {
      setPage((prevState) => {
        const newPage = prevState - 1;
        setPageInLS(newPage);
        return newPage;
      });
    }
  };

  const navigate = useNavigate();

  const handleAuth = async () => {
    const query = new URLSearchParams(location.search);
    const requestToken = query.get("request_token");
    const approved = query.get("approved");

    try {
      if (approved === "true" && requestToken) {
        // Create access token
        const accessToken = await dispatch(
          createAccessToken({ requestToken })
        ).unwrap();

        // Fetch account details
        const accountDetails = await dispatch(
          fetchAccountDetails(accessToken)
        ).unwrap();
        console.log("Account Details:", accountDetails);

        // Validate API key
        await dispatch(validateApiKey()).unwrap();

        // Create request token and redirect
        const redirectTo = `${window.location.origin}/movies-app`;
        await dispatch(createRequestToken({ redirectTo })).unwrap();

        // Navigate after successful authentication
        navigate("/movies-app");
      } else {
        console.error("Authorization failed or request token missing");
      }
    } catch (error) {
      console.error("Error during authentication process:", error);
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
      <button onClick={handleAuth}>reg</button>
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
