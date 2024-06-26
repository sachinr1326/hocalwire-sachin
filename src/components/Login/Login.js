import React, { useState } from "react";
import FormInputChange from "../../GlobalComponents/Utils/FormInputChange";
import FormValidation from "../../GlobalComponents/Utils/FormValidation";
import "../Register/Register.css";
import { NavLink,useNavigate } from "react-router-dom";
import { post_user } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useAuth } from "../../services/Auth_context";
const Login = () => {
    const navigate = useNavigate();
    const {login} =useAuth();
  const [errors, setErrors] = useState({});
  const [btndisable, setBtnDisable] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const handleInputChange = (e) => {
    FormInputChange(e, formData, setFormData, errors, setErrors);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (FormValidation(formData, {}, setErrors)) {
        setBtnDisable(true);

        login(formData).then((res) => {
        if (res) {
          setBtnDisable(false);
          setFormData({
            username: "",
            password: ""
          });
          navigate("/")
        } else {
          setBtnDisable(false);
        }
      });
    }
  };
  return (
    <div className="register-container border ">
      <div className="header-sec">
        <h1 className="title">Login</h1>
      </div>
      <div className="field-sec">
        <form onSubmit={handleSubmit}>

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

          <button type="submit" className="register-btn" disabled={btndisable}>
            {btndisable ? "Please wait..." : "Login"}
          </button>

        </form>
        <div>new register? <NavLink to="/signup">Sign Up</NavLink></div>
      </div>
    </div>
  );
};

export default Login;
