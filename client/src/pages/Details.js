import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputGroup from "../components/InputGroup";

function Details() {
  const navigate = useNavigate();
  // ** get id from params
  const { id } = useParams();
  // ** user fetched from backend
  const defaultUser = {
    email: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
  };
  const [user, setUser] = useState({ ...defaultUser });
  useEffect(() => {
    getUser();
  }, []);
  // ** errors from backend
  const getUser = async () => {
    await axios.get(`http://localhost:8080/api/user/${id}`).then((res) => {
      setUser((prev) => ({ ...res?.data?.item }));
    });
  };
  const [errors, setErrors] = useState({});
  // ** onChange new user
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  // ** submit update new user
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/user/${id}`, user).then((res) => {
      if (res?.status === 200) {
        navigate("/");
      }
    });
    /* .catch((err) => setErrors(err.response.data)); */
  };
  return (
    <div className="container mt-4 col-12 col-lg-4">
      <span className="badge bg-info mb-2 p-2">
        <Link to={`/`} className="text-black">
          Go Back
        </Link>
      </span>
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Email"
          type="text"
          name="email"
          onChangeHandler={onChangeHandler}
          errors={errors?.email}
          value={user?.email}
        />
        <InputGroup
          label="Last name"
          type="text"
          name="lastName"
          onChangeHandler={onChangeHandler}
          errors={errors.lastName}
          value={user.lastName}
        />
        <InputGroup
          label="First name"
          type="text"
          name="firstName"
          onChangeHandler={onChangeHandler}
          errors={errors?.firstName}
          value={user?.firstName}
        />
        <InputGroup
          label="Phone number"
          type="text"
          name="phoneNumber"
          onChangeHandler={onChangeHandler}
          errors={errors?.phoneNumber}
          value={user?.phoneNumber}
        />
        <button className="btn btn-primary" type="submit">
          Add user
        </button>
      </form>
    </div>
  );
}

export default Details;
