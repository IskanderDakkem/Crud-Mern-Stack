import React from "react";

function Alert({ message }) {
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
}

export default Alert;
