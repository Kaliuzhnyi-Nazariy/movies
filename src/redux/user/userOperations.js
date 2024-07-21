// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { defaultUserAxios } from "../defaultaxios";

// const newUser = {
//   nickname: "MuhammadNurAli",
//   email: "muh.nurali43@gmail.com",
//   password: "12345678",
// };

// export const RegUser = createAsyncThunk("user/regUser", async () => {
//   try {
//     const res = await axios.post(`${defaultUserAxios}/register`, newUser);
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     console.log("Error in redux/user/userOperations/RegUser", error);
//   }
// });
