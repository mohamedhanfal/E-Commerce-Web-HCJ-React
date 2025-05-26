import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
      });
  }, [id]);

  function addToCart() {
    const itemExist = cartItems.find(
      (item) => item.product._id === product._id
    );
    if (!itemExist) {
      const newItem = { product, qty };
      setCartItems((state) => [...state, newItem]);
      toast.success("Item added to cart");
    }
  }
  return (
    product && (
      <div class="container container-fluid">
        <div class="row f-flex justify-content-around">
          <div class="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].Image}
              alt={product.name}
              height="500"
              width="auto"
            />
          </div>
          <div class="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr />
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${product.ratings * 20}%` }}
              ></div>
            </div>

            <hr />
            <p id="product_price">${product.price}</p>
            <div class="stockCounter d-inline">
              <span class="btn btn-danger minus">-</span>
              <input
                type="number"
                class="form-control count d-inline"
                value={qty}
                readOnly
              />
              <span class="btn btn-primary plus">+</span>
            </div>
            <button
              type="button"
              onClick={addToCart}
              id="cart_btn"
              class="btn btn-primary d-inline ml-4"
            >
              Add to Cart
            </button>

            <hr />
            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />
            <h4 class="mt-2">Description:</h4>
            <p>{product.description}</p>

            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>
            <div class="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}
