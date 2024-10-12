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

export const deleteHotel = async (token, hotelId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/delete-hotel/${hotelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const read = async (hotelId) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/hotel/${hotelId}`);
};

export const updateHotel = async (token, data, hotelId) =>
  await axios.put(
    `${process.env.REACT_APP_API_URL}/update-hotel/${hotelId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const userHotelBookings = async (token) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/user-hotel-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const isAlreadyBooked = async (token, hotelId) =>
  await axios.get(
    `${process.env.REACT_APP_API_URL}/is-already-booked/${hotelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
