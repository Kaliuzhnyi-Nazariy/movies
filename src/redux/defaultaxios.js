import axios from "axios";

export const defaultUserAxios =
  "https://todolist-project-dxkv.onrender.com/api/users/";

export const defaultMovieAxios = `https://api.themoviedb.org/3`;

// export const optionsForMovies = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     // api_key: "bffcd5617baa20bace005688f43a2e6f",
//     // Authorization:
//     //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmZjZDU2MTdiYWEyMGJhY2UwMDU2ODhmNDNhMmU2ZiIsIm5iZiI6MTcyMTU2MjU0MS42NzQ4NzEsInN1YiI6IjY2OWNmM2Q5MGUwYmIyYWIyMmRkNTllZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T4QllnMX1G0XTmbQbhoYDtJam1pZYXjpIoouFpOAxms",
//   },
// };

export const defaultAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "bffcd5617baa20bace005688f43a2e6f", // Replace 'YOUR_API_KEY' with your actual TMDb API key
  },
});
