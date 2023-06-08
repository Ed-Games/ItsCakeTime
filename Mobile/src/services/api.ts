import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Navigate } from "./RootNavigation";

import { APP_URL } from "@env";

async function GetUserData() {
  const userData = await AsyncStorage.getItem("user");
  if (userData) return JSON.parse(userData);
}

const api = axios.create({
  baseURL: APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.message == "Network Error") {
      Navigate("Landing", { message: "connection error" });
      return;
    }

    if (error.response.status === 401 || error.response.status === 403) {
      const requestConfig = error.config;
      Navigate("Login", {});

      return axios(requestConfig);
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    return GetUserData()
      .then((user) => {
        if (user && user.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return Promise.resolve(config);
      })
      .catch((err) => {
        console.log(err);

        return Promise.resolve(config);
      });
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;
