import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Cart({ cartItems, setCartItems }) {
  const [complete, setComplete] = useState(false);

  function increaseQty(item) {
    if (item.qty < item.product.stock) {
      const updateItems = cartItems.map((i) => {
        if (i.product._id === item.product._id) {
          i.qty++;
        }
        return i;
      });
      setCartItems(updateItems);
    } else {
      toast.error("Maximum stock reached");
    }
  }
  function decreaseQty(item) {
    if (item.qty > 1) {
      const updateItems = cartItems.map((i) => {
        if (i.product._id === item.product._id) {
          i.qty--;
        }
        return i;
      });
      setCartItems(updateItems);
    }
  }

  function removeItem(item) {
    const updateItems = cartItems.filter((i) => {
      if (i.product._id !== item.product._id) {
        return true;
      }
    });
    setCartItems(updateItems);
  }

  function placeOrderHandler() {
    fetch(process.env.REACT_APP_API_URL + "/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    }).then(() => {
      setCartItems([]);
      setComplete(true);
      toast.success("Order placed successfully");
    });
  }

  return cartItems.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item) => (
              <Fragment>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].Image}
                        alt={item.product.name}
                        height="90"
                        width="auto"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      {/* <a href="#">{item.product.name}</a> */}
                      <Link to={"/product/" + item.product._id}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeItem(item)}
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  (Units)
                </span>
              </p>
              <p>
                Est. total:
                <span className="order-summary-values">
                  $
                  {Number(cartItems.reduce(
                    (acc, item) => acc + item.qty * item.product.price,
                    0
                  )).toFixed(2)}
                </span>
              </p>

              <hr />
              <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrderHandler}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !complete ? (
    <div className="container container-fluid">
      <h2 className="mt-5">Your Cart is Empty</h2>
      <Link to="/">
        <button id="cart_btn" className="btn btn-primary mt-3">
          Go Back
        </button>
      </Link>
    </div>
  ) : (
    <div className="container container-fluid">
      <h2 className="mt-5">Order Placed Successfully</h2>
      <Link to="/">
        <button id="cart_btn" className="btn btn-primary mt-3">
          Go Back
        </button>
      </Link>
    </div>
  );
}
