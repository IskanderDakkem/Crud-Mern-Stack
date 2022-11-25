// ** react imports
import React, { useEffect, useState } from "react";
// ** components
import InputGroup from "../components/InputGroup";
import RowDetails from "../components/RowDetails";
import Alert from "../components/Alert";
// ** axios
import axios from "axios";
// ** ----------------------------------------------
function Home() {
  // ** list of all the users
  const [users, setUsers] = useState([]);
  // ** show the alert
  const [show, setShow] = useState(false);
  // ** errors from backend
  const [errors, setErrors] = useState({});
  // ** Message in the alert
  const [message, setMessage] = useState("");
  // ** new user
  const defaultUser = {
    email: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
  };
  const [newUser, setNewUser] = useState({ ...defaultUser });
  // ** on change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...newUser, [name]: value }));
  };
  // ** get all users
  useEffect(() => {
    getUsers();
  }, [errors, message]);
  const getUsers = async () => {
    await axios.get("http://localhost:8080/api/user/").then((res) => {
      if (res?.status === 200) {
        setUsers((prev) => res?.data?.items);
      }
    });
  };
  // ** delete user
  const OnDelete = (_id) => {
    if (window.confirm("are you sure to delete this user")) {
      axios.delete(`http://localhost:8080/api/user/${_id}`).then((res) => {
        if (res?.status === 200) {
          setMessage("User deleted successfully");
          setShow(true);
          setTimeout(() => {
            setShow(false);
            setMessage("");
          }, 4000);
        }
      });
    }
  };
  // ** create a new user
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/user/", newUser)
      .then((res) => {
        // ** empty the user
        if (res?.status === 200) {
          setNewUser(defaultUser);
          setMessage("User was created successfully");
          setShow(true);
          setTimeout(() => {
            setShow(false);
            setMessage("");
          }, 4000);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          setErrors((prev) => ({
            ...errors,
            email: "This email already used",
          }));
        }
        if (err?.response?.status === 422) {
          setErrors((prev) => ({
            ...errors,
            phoneNumber: "This phone number is already used",
          }));
        }
      });
  };
  return (
    <div className="row p-4">
      {show && <Alert message={message} />}
      <div className="mt-4">
        <h2>Crud Users</h2>
      </div>
      <div className="col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="Email"
            type="text"
            name="email"
            onChangeHandler={onChangeHandler}
            errors={errors?.email}
            value={newUser?.email}
          />
          <InputGroup
            label="Last name"
            type="text"
            name="lastName"
            onChangeHandler={onChangeHandler}
            errors={errors?.lastName}
            value={newUser?.lastName}
          />
          <InputGroup
            label="First name"
            type="text"
            name="firstName"
            onChangeHandler={onChangeHandler}
            errors={errors?.firstName}
            value={newUser?.firstName}
          />
          <InputGroup
            label="Phone number"
            type="text"
            name="phoneNumber"
            onChangeHandler={onChangeHandler}
            errors={errors?.phoneNumber}
            value={newUser?.phoneNumber}
          />
          <button className="btn btn-primary" type="submit">
            Add user
          </button>
        </form>
      </div>
      <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Lastname</th>
              <th scope="col">Firstname</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ email, lastName, firstName, phoneNumber, _id }) => (
              <RowDetails
                key={_id}
                email={email}
                lastName={lastName}
                firstName={firstName}
                phoneNumber={phoneNumber}
                _id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
