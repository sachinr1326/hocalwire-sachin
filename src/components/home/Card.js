import React, { useEffect, useState } from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import { useAuth } from "../../services/Auth_context";
import { get_user_cart } from "../../services/ApiService";
function Card(props) {
  const { addtocart, user } = useAuth();
  const [quantity, setquantity] = useState(1);
  const [cartlist, setCartList] = useState([]);
  const [cartlistshow, setCartListshow] = useState(false);
  const handlequantity = (e) => {
    e.preventDefault();
    setquantity(e.target.value);
  };
  const handleAddtoCart = (id, event) => {
    event.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;
    const data = {
      userId: user.id,
      date: new Date(),
      products: [{ productId: id, quantity: quantity }],
    };
    addtocart(null, data, signal);
  };
  useEffect(() => {
    get_user_cart(user.id).then((res) => {
      if (res.status) {
        setCartList(res?.response?.data);
      }
    });
  }, []);
  const [selectedCartId, setSelectedCartId] = useState("");

  const handleCartChange = (event) => {
    setSelectedCartId(event.target.value);
  };
  return (
    <NavLink to={`product/${props.data.id}`} className="card-pd">
      <div className="card-pd-wrapper">
        <div className="img-sec">
          <img src={props.data.image} alt="" />
        </div>
        <div className="card-pd-body">
          <h2 className="title">{props.data.title}</h2>
          <p className="desc">
            {props.data.description?.split("")?.slice(0, 100)?.join("")}...
          </p>
          <div className="rating">
            <div className="rate">
              <i class="fa-solid fa-star"></i> {props.data.rating.rate}
            </div>
            <div className="member">
              <i class="fa-solid fa-user"></i>
              {props.data.rating.count}
            </div>
          </div>
          <div className="add-to-cart-sec">
            <div className="price">₹{props.data.price}</div>
            <div
              className="addtocart"
              onClick={(event) => handleAddtoCart(props.data.id, event)}
            >
              Add to Cart
            </div>
            <div
              className="quantity"
              onClick={(event) => event.preventDefault()}
            >
              Quantity:{" "}
              <input type="number" value={quantity} onChange={handlequantity} />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Card;
