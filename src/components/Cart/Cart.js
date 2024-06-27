import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";
import emptyCart from "../../images/empty_shopping_cart.gif";
import { useAuth } from "../../services/Auth_context";
import {
  delete_cart,
  delete_cart_item,
  get_product_detail,
  get_user_cart,
  update_cart,
} from "../../services/ApiService";
import Loading from "../../GlobalComponents/Loading/Loading";
import Navbar from "../../GlobalComponents/Navbar/Navbar";

const Cart = () => {
  const { token, user } = useAuth();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartcount, setCartCount] = useState(0);
  const [totalcartprice, setTotalCartPrice] = useState(0);
  const [cartprice, setCartPrice] = useState(0);
  const fetchData = async (id) => {
    // get cart
    const cartresponse = await get_user_cart(id);
    const cartdata = cartresponse?.response?.data;
    setCartCount(cartdata?.length);
    // get cart product with details
    const productDetailsPromises = [];
    cartdata.map((cart) => {
      let cartwithdetail = [{ cart: { id: cart.id, date: cart.date } }];
      cart.products.map((product) => {
        cartwithdetail.push(
          get_product_detail(product.productId).then((res, index) => {
            if (res.status) {
              const data = res?.response?.data;
              data.quantity = product.quantity;
              data.cartId = cart.id;
              return data;
            }
          })
        );
      });
      productDetailsPromises.push(Promise.all(cartwithdetail));
    });

    // use promise for get all product detail then it go to setcarts
    const productwithdetail = await Promise.all(productDetailsPromises);
    const cartsWithTotalPrice = productwithdetail.map((cartItems, index) => {
      const totalPrice = cartItems.reduce((total, item, index) => {
        if (index !== 0) {
          return total + item.price * item.quantity;
        }
        return 0;
      }, 0);
      return totalPrice;
    });
    setCartPrice(cartsWithTotalPrice);
    setTotalCartPrice(() =>
      cartsWithTotalPrice.reduce((sum, price) => {
        return sum + parseFloat(price);
      })
    );
    setCarts(productwithdetail);
    setLoading(false);
  };

  useEffect(() => {
    if (token && user.id) {
      fetchData(user.id);
    }
  }, []);
  const finalPrice = 0;
  const updatequantity = (
    cartId,
    productId,
    quantity,
    cartIndex,
    productIndex,
    value
  ) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const totalquantity =
      quantity >= 1  ? quantity + value : quantity;
    const data = {
      userId: user.id,
      products: [{ productId: productId, quantity: totalquantity }],
    };

    update_cart(data, cartId, signal).then((res) => {
      if (res.status) {
        toast.success("Your Product updated successfully");
        setCarts((prevdata) => {
          return prevdata.map((cart, cindex) => {
            if (cindex === cartIndex) {
              const updatedProducts = cart.map((product, pindex) => {
                if (pindex === productIndex && productId === product.id) {
                  if (quantity !== 1) {
                    // Update the total cart price
                    setCartPrice((prevPrices) => {
                      const updatedPrices = prevPrices.map((price, index) => {
                        if (index === cartIndex) {
                          const product = carts[cartIndex][productIndex];
                          const difference =
                            (totalquantity - quantity) * product.price;
                          return price + difference;
                        }
                        return price;
                      });
                      setTotalCartPrice(
                        updatedPrices.reduce((sum, price) => sum + price, 0)
                      );
                      return updatedPrices;
                    });

                    return { ...product, quantity: totalquantity };
                  }
                }
                return product;
              });
              return [...updatedProducts];
            }
            return cart;
          });
        });
      } else {
        toast.info("something went wrong!");
      }
      if (controller) {
        controller.abort();
      }
    });
  };
  const handleRemoveItem = (cartId, productId, cindex, pindex) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const productlist = [];
    carts.map((cart) => {
      cart.map((product,index) => {
        if (product.id !== productId && index !==0) {
          productlist.push({
            productId: product.id,
            quantity: product.quantity,
          });
        }
      });
    });
    delete_cart_item(cartId, {userId:user.id,date:new Date(),products:productlist}, signal).then((res) => {
if(res.status){
    toast.success(" Your Cart updated successfully");

    setCarts((prevCarts) => {
        return prevCarts.map((cart, index) => {
          if (index === cindex) {
            const updatedProducts = cart.filter(
              (product) => product.id !== productId
            );
  
            return [...updatedProducts];
          }
          return cart;
        });
      });
      // Update the total cart price
      setCartPrice((prevPrices) => {
        const updatedPrices = prevPrices.map((price, index) => {
          if (index === cindex) {
            const product = carts[cindex][pindex];
            const difference = product.quantity * product.price;
            return price - difference;
          }
          return price;
        });
        setTotalCartPrice(updatedPrices.reduce((sum, price) => sum + price, 0));
        return updatedPrices;
      });
}else{
    toast.info("Something Went wrong!")
}

    });
 
  };
  const handleDeleteCart = (id, cindex) => {
    delete_cart(id).then((res) => {
      if (res.status) {
        toast.success("Cart deleted successfully");
        setCarts((prev) => prev.filter((val, index) => index !== cindex));
        setTotalCartPrice((prev) => prev - cartprice[cindex]);
        setCartPrice((prev) => prev.filter((val, index) => index !== cindex));
      } else {
        toast.info("something went wrong!");
      }
    });
  };
  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div id="shopping-cart-header">
            <div className="shopping-cart-header-wrapper">
              <h1>Shopping Cart</h1>
            </div>
          </div>
          {carts.length > 0 ? (
            <>
              <div className="shopping-cart-items-wrapper">
                <div className="shopping-cart-items-container ">
                  <div className="shopping-cart-items-heading">
                    {cartcount} Cart
                  </div>
                  <div className="shopping-cart-items-list">
                    {carts &&
                      carts?.map((res, index1) => (
                        <>
                          {res?.map((result, index) =>
                            index === 0 ? (
                              <div className="shopping-cart-items-heading">
                                <span> {res.length - 1} item</span>
                                <button
                                  className="cart-checkout-btn "
                                  style={{ maxWidth: "fit-content" }}
                                  onClick={() =>
                                    handleDeleteCart(result.cart.id, index1)
                                  }
                                >
                                  Delete cart {index1 + 1}
                                </button>
                                <span>
                                  {index1 + 1} Cart:
                                  {new Date(result.cart.date)
                                    .getDate()
                                    .toString() +
                                    "/" +
                                    (
                                      new Date(result.cart.date).getMonth() + 1
                                    ).toString() +
                                    "/" +
                                    new Date(result.cart.date)
                                      .getFullYear()
                                      .toString()}
                                </span>
                              </div>
                            ) : (
                              <div key={index}>
                                <div className="shopping-cart-item">
                                  <div className="cart-item-content">
                                    <div className="cart-item-img">
                                      <img
                                        src={result.image}
                                        className="img-thumbnail"
                                        alt="demo text"
                                      />
                                    </div>
                                    <div className="cart-items-content-wrapper">
                                      <h5 className="cart-item-name">
                                        {result.title}
                                      </h5>
                                      <div className="quant-sec">
                                        <span
                                          className="minus"
                                          onClick={() =>
                                            updatequantity(
                                              result.cartId,
                                              result.id,
                                              result.quantity,
                                              index1,
                                              index,
                                              -1
                                            )
                                          }
                                        >
                                          <i class="fa-solid fa-minus"></i>
                                        </span>
                                        <span className="quantity">
                                          {result.quantity}
                                        </span>
                                        <span
                                          className="plus"
                                          onClick={() =>
                                            updatequantity(
                                              result.cartId,
                                              result.id,
                                              result.quantity,
                                              index1,
                                              index,
                                              1
                                            )
                                          }
                                        >
                                          <i class="fa-solid fa-plus"></i>
                                        </span>
                                      </div>
                                      <p
                                        className="cart-item-remove"
                                        onClick={() =>
                                          handleRemoveItem(
                                            result.cartId,
                                            result.id,
                                            index1,
                                            index
                                          )
                                        }
                                      >
                                        Remove
                                      </p>
                                    </div>
                                  </div>

                                  <div className="cart-item-price">
                                    <p className="final-price">
                                      ₹ {result.price}
                                    </p>
                                    <p className="total-price">
                                      Total: ₹ {result.price * result.quantity}
                                    </p>
                                  </div>
                                </div>
                                <hr style={{ margin: "0" }} />
                              </div>
                            )
                          )}
                          <div className="total-price border-bottom p-3">
                            {" "}
                            Cart {index1 + 1} Total Price: {cartprice[index1]}
                          </div>
                        </>
                      ))}
                  </div>
                </div>

                <div className="shopping-cart-total-and-checkout">
                  <div className="cart-total-and-checkout">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                          <th colSpan={2} className="text-start">
                            Cart
                          </th>
                          <th colSpan={2} className="text-end">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartprice.map((res, index) => (
                          <tr>
                            <td colSpan={2} className="final-price">
                              Cart {index + 1}
                            </td>
                            <td colSpan={2} className="discount-price text-end">
                              ₹ {res}
                            </td>
                          </tr>
                        ))}

                        <tr className="border-top">
                          <th colSpan={2}>Payable Amount:</th>
                          <td colSpan={2} className="final-price text-end">
                            ₹ {totalcartprice}
                            {finalPrice?.length === 0
                              ? carts.discounted_price
                              : finalPrice}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button className="button_design cart-checkout-btn form-control mt-5">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div class=" empty-cart-cls text-center rounded border">
              <img
                src={emptyCart}
                width="200"
                class="img-fluid mb-4 mr-3"
                alt="Edcater-Empty Cart"
              />
              <h3>
                <strong>Your Cart is Empty</strong>
              </h3>
              <h4>Add something to make me happy :)</h4>
              <NavLink to="/" class=" button_design m-3" data-abc="true">
                Continue shopping
              </NavLink>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
