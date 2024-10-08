import axios from "axios";

export const createHotel = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allHotels = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/hotels`);

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellerHotels = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/seller-hotels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
