import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import NotFound from "./Pages/NotFound";
import MoviesPage from "./Pages/MoviesPage";
import Movies from "./Pages/Movies";
import "bootstrap/dist/css/bootstrap.min.css";
import TvSeries from "./Pages/TvSeries";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<Movies />} />
        <Route path="/tvseries/:tvSeries" element={<TvSeries />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
