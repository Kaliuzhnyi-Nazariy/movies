import { useDispatch, useSelector } from "react-redux";
import { getTopFilms } from "../redux/movie/movieOperations";
import { selectMovies, selectMoviesPage } from "../redux/movie/movieSellectors";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const dispatch = useDispatch();

  const page = useSelector(selectMoviesPage);

  useEffect(() => {
    dispatch(getTopFilms(page));
  }, [dispatch, page]);
  const filmsList = useSelector(selectMovies);
  console.log(filmsList);
  return (
    <div>
      <Link to={"/"}>Home</Link>
      {filmsList.map((film) => {
        return (
          <>
            <Link to={`${film.id}`} style={{ display: "flex" }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                style={{ width: "120px" }}
              />
              <h2>{film.title}</h2>
            </Link>
          </>
        );
      })}
      <p>{page}</p>
    </div>
  );
};

export default MoviesPage;
