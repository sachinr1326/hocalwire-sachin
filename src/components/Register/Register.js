import React, { useState } from "react";
import FormInputChange from "../../GlobalComponents/Utils/FormInputChange";
import FormValidation from "../../GlobalComponents/Utils/FormValidation";
import "./Register.css";
import { NavLink } from "react-router-dom";
import { post_user } from "../../services/ApiService";
import { toast } from "react-toastify";
const Register = () => {
  const [errors, setErrors] = useState({});
  const [btndisable, setBtnDisable] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    street: "",
    number: "",
    city: "",
    zipcode: "",
    lat: "",
    long: "",
    agree: false,
  });
  const handleInputChange = (e) => {
    FormInputChange(e, formData, setFormData, errors, setErrors);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (FormValidation(formData, {}, setErrors)) {
        setBtnDisable(true);
      const data = {
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone: formData.phone,
        address: {
          geolocation: {
            lat: formData.lat,
            long: formData.long,
          },
          city: formData.city,
          street: formData.street,
          number: formData.number,
          zipcode: formData.zipcode,
        },
      };
      post_user(data).then((res) => {
        if (res.status) {
          toast.success("Successfully register");
          setBtnDisable(false);
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            phone: "",
            street: "",
            number: "",
            city: "",
            zipcode: "",
            lat: "",
            long: "",
            agree: false,
          });
        } else {
          toast.info("Something went wrong!");
          setBtnDisable(false);
        }
      });
    }
  };
  return (
    <div className="common-section">
    <div className="register-container border ">
      <div className="header-sec">
        <h1 className="title">Register</h1>
      </div>
      <div className="field-sec">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div className="mb-3" style={{ flexGrow: "1" }}>
              <label className="form-label">
                First Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                className={`form-control ${errors.firstname && "is-invalid"}`}
                placeholder="Enter your First Name"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{errors.firstname}</div>
            </div>
            <div className="mb-3" style={{ flexGrow: "1" }}>
              <label className="form-label">
                Last Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                className={`form-control ${errors.lastname && "is-invalid"}`}
                placeholder="Enter your First Name"
                value={formData.lastname}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{errors.lastname}</div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              UserName<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="username"
              className={`form-control ${errors.username && "is-invalid"}`}
              placeholder="Enter your First Name"
              value={formData.username}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{errors.username}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email ID<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              placeholder="Enter your Email ID"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Phone no.<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="phone"
              className={`form-control ${errors.phone && "is-invalid"}`}
              placeholder="Enter your Phone no."
              value={formData.phone}
              onChange={handleInputChange}
              autoComplete="mobile tel"
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password && "is-invalid"}`}
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <div className="title-line">address</div>
          <div className="mb-3">
            <label className="form-label">
              City<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="city"
              className={`form-control ${errors.city && "is-invalid"}`}
              placeholder="Enter your City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{errors.city}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Street<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="street"
              className={`form-control ${errors.street && "is-invalid"}`}
              placeholder="Enter your street"
              value={formData.street}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{errors.street}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Number<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="number"
              className={`form-control ${errors.number && "is-invalid"}`}
              placeholder="Enter your number"
              value={formData.number}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{errors.number}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Zipcode<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="zipcode"
              className={`form-control ${errors.zipcode && "is-invalid"}`}
              placeholder="Enter your zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{errors.zipcode}</div>
          </div>
          <div className="title-line">GeoLocation</div>
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div className="mb-3" style={{ flexGrow: "1" }}>
              <label className="form-label">
                Latitude<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="lat"
                className={`form-control ${errors.lat && "is-invalid"}`}
                placeholder="Enter your Latitude"
                value={formData.lat}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{errors.lat}</div>
            </div>
            <div className="mb-3" style={{ flexGrow: "1" }}>
              <label className="form-label">
                Longitude<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="long"
                className={`form-control ${errors.long && "is-invalid"}`}
                placeholder="Enter your Longitude"
                value={formData.long}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{errors.long}</div>
            </div>
          </div>
          <div className="form-check mb-3">
            <input
              className={`form-check-input   ${errors.agree && "is-invalid"}`}
              type="checkbox"
              id="flexCheckDefault"
              name="agree"
              checked={formData.agree}
              onChange={handleInputChange}
            />
            <label
              className={`form-check-label  term-policy p-0 m-0 ${
                errors.agree && "is-invalid"
              }`}
              htmlFor="flexCheckDefault"
            >
              By providing your contact detail, you agree to our
              <NavLink className=" me-1 ms-1" to="">
                Terms of Use
              </NavLink>
              &
              <NavLink className=" ms-1" to="">
                PrivacyPolicy
              </NavLink>
            </label>
          </div>
          <button type="submit" className="register-btn" disabled={btndisable}>
            {btndisable ? "Please wait..." : "Sign Up"}
          </button>
        </form>
        <div>Already register? <NavLink to="/login">Login</NavLink></div>
      </div>
    </div>
    </div>
  );
};

export default Register;
