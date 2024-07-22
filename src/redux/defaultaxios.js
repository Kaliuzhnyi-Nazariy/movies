import axios from "axios";

export const defaultUserAxios =
  "https://todolist-project-dxkv.onrender.com/api/users/";

export const defaultMovieAxios = `https://api.themoviedb.org/3`;

export const defaultAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "bffcd5617baa20bace005688f43a2e6f",
  },
});
