import axios from "axios";

export const createConnectAccount = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountStatus = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

//update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
