import React from "react";

const Notification = ({ message, failureNotification }) => {
  const notificationStyle = {
    color: failureNotification ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    border: "5px solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
