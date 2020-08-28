import React from "react";

const Notification = ({ message, error, dissapear }) => {
  const style = {
    color: error ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (!message) {
    return null;
  }
  if (dissapear) {
    return null;
  }

  return (
    <div style={style} visible="hidden">
      {message}
    </div>
  );
};

export default Notification;
