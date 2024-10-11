import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../stripe/stripe";
import { LoadingOutlined } from "@ant-design/icons";

const StripeCancel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  useEffect(() => {
    // console.log("send this hotelid to backend to crate order", hotelId);
    stripeSuccessRequest(token, hotelId).then((res) => {
      if (res.data.success) {
        // console.log("stripe success response", res.data);
        navigate("/dashboard");
      } else {
        navigate("/stripe/cancel");
      }
    });
  }, [hotelId, token, navigate]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeCancel;
