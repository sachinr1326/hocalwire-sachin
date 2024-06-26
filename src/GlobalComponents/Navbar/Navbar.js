import React, { useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Auth_context";
const Navbar = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
if(!token){
navigate("/login")
}
  },[token])
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="https://www.hocalwire.com/images/logo.png" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    hi,{user?.name?.firstname+" "+user?.name?.lastname}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
