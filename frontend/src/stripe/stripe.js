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
