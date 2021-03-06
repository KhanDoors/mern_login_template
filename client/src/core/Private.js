import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  authenticate,
  isAuth,
  getCookie,
  signout,
  updateUser
} from "../auth/helpers";

const Private = ({ history }) => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    buttonText: "Submit"
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const { name, role, email } = response.data;
        setValues({ ...values, name, role, email });
      })
      .catch(error => {
        if (error.response.status == 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };

  const { role, name, email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password }
    })
      .then(response => {
        console.log(response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: "Submitted"
          });
          toast.success("Profile Update Successfully");
        });
      })
      .catch(error => {
        console.log(error.response.data.error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Role</label>
        <input
          defaultValue={role}
          type="text"
          className="form-control"
          disabled
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          defaultValue={email}
          type="email"
          className="form-control"
          disabled
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="pt-5 text-center">Hello {name}</h1>
        <p className="lead text-center">Update your Profile</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
