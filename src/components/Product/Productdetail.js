import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { get_product_detail } from "../../services/ApiService";
import Loading from "../../GlobalComponents/Loading/Loading";
import Title from "../../GlobalComponents/Headings/Title";
import "./Productdetail.css";
import { useAuth } from "../../services/Auth_context";
const Productdetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState();
  const [loding, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (id) {
      get_product_detail(id, signal).then((res) => {
        if (res.status) {
          setProducts(res.response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }
    return () => controller.abort();
  }, []);
  const { addtocart, user } = useAuth();
  const [quantity, setquantity] = useState(1);
  const handlequantity = (e) => {
    e.preventDefault();
    setquantity(e.target.value);
  };
  const handleAddtoCart = (id, value) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const data = {
      userId: user.id,
      date: new Date(),
      products: [{ productId: id, quantity: quantity }],
    };
    addtocart(null, data, signal);
    if (value === "buynow") {
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
    }
  };
  return (
    <>
      {loding ? (
        <Loading />
      ) : (
        products && (
        <div className="product-container border">
          <NavLink to="/" className="back">
            <i class="fa-solid fa-left-long"></i> Back to home
          </NavLink>
          <Title title={products?.title} />
          <div className="header-sec">
            <div className="img-sec border rounded">
              <img
                src={products?.image}
                className="prod-img"
                alt={products?.title}
              />
            </div>
            <div className="cart-sec">
              <div className="details">
                <div className="title">{products?.title}</div>
                <div className="desc">{products?.description}</div>
                <div className="rating">
                  <div className="rate">
                    <i class="fa-solid fa-star"></i> {products?.rating.rate}
                  </div>
                  <div className="member">
                    <i class="fa-solid fa-user"></i>
                    {products?.rating.count}
                  </div>
                </div>
                <div className="price">₹{products?.price}</div>
              </div>
              <div
                className="quantity"
                onClick={(event) => event.preventDefault()}
              >
                Quantity:{" "}
                <input
                  type="number"
                  value={quantity}
                  onChange={handlequantity}
                />
              </div>

              <button
                className="add-to-cart"
                onClick={() => handleAddtoCart(products.id, "addtocart")}
              >
                Add to Cart
              </button>
              <button
                className="add-to-cart"
                onClick={() => handleAddtoCart(products.id, "buynow")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        )
      )}
    </>
  );
};

export default Productdetail;
