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

export const getAccountBalance = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currencyFormatter = (data) => {
  if (
    !data ||
    data.amount === null ||
    data.amount === undefined ||
    !data.currency
  ) {
    return "N/A"; // Return a default value or handle the case as needed
  }

  return (data.amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: data.currency,
  });
};

export const payoutSetting = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getSessionId = async (token, hotelId) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/stripe-session-id`,
    { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const stripeSuccessRequest = async (token, hotelId) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/stripe-success`,
    { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
