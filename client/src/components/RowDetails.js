import React from "react";
import { Link } from "react-router-dom";

function RowDetails({
  email,
  lastName,
  firstName,
  phoneNumber,
  _id,
  OnDelete,
}) {
  return (
    <tr>
      <th>{email}</th>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phoneNumber}</td>
      <td className="gap__actions">
        {/* Link to single profile */}
        <Link to={`/${_id}`} className="text-white">
          <span className="badge bg-info">
            <i className="fas fa-edit"></i>
          </span>
        </Link>
        {/* delete button */}
        <span className="badge bg-danger" onClick={() => OnDelete(_id)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </td>
    </tr>
  );
}

export default RowDetails;
