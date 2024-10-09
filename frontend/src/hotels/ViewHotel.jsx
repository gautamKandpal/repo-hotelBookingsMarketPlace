import React, { useState, useEffect } from "react";
import { read, diffDays } from "../actions/hotel";
import { useNavigate, useParams } from "react-router-dom";
// import { getSessionId } from "../actions/stripe";
import moment from "moment";
import { useSelector } from "react-redux";

const ViewHotel = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams(); // Get the hotelId from the route params
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  // const [loading, setLoading] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    //   setLoading(true);

    if (!auth) navigate("/login");
    console.log("get session id from stripe to show a button ");
    //   try {
    //     let res = await getSessionId(auth.token, hotelId); // Use hotelId from useParams
    //     const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    //     await stripe.redirectToCheckout({
    //       sessionId: res.data.sessionId,
    //     });
    //   } catch (error) {
    //     console.error("Error in Stripe checkout", error);
    //   } finally {
    //     setLoading(false);
    //   }
  };

  const loadSellerHotel = async () => {
    let res = await read(hotelId); // Use hotelId from useParams
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API_URL}/hotel/image/${res.data._id}`);
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img
              src={image}
              alt={hotel.title}
              className="img img-fluid m-2 "
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              //   disabled={loading}
            >
              {/* {loading
                ? "Loading..."
                :  */}
              {auth && auth.token ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
