import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-my-burger-63afc-default-rtdb.firebaseio.com",
  timeout: 5000,
});

export default axiosInstance;
