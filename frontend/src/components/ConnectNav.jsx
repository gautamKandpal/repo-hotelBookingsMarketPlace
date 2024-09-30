import React from "react";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

function ConnectNav() {
  // const auth  = useSelector((state) => state.auth)
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={user.name[0]}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
    </div>
  );
}

export default ConnectNav;
