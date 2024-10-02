import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "./stripe";
import { updateUserInLocalStorage } from "./stripe";

function Stripecallback() {
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.token) {
      accountStatus();
    } else {
      navigate("/login"); //redirect to login if no token
    }
  }, [auth, navigate]);

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      // console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);

      //update user in local storage
      updateUserInLocalStorage(res.data, () => {
        //update user in redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });

        //redirect user to dashboard
        window.location.href = "/dashboard/seller";
      });
    } catch (err) {
      console.log("ERROR FROM ACC STATUS", err);
    }
  };
  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
}

export default Stripecallback;
