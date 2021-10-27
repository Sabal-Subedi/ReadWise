import React from "react";
import { useLocation } from "react-router-dom";

function ProductDetails({ basketItem, setBasketItem }) {
  const location = useLocation();

  const addToBasket = (e) => {
    e.preventDefault();
    setBasketItem([
      ...basketItem,
      {
        id: location.state.id,
        title: location.state.title,
        price: location.state.price,
      },
    ]);
  };
  console.log(location.state.description);

  return (
    <div className="productdetailsdetails">
      <div className="productdetails__info">
        <p>{location.state.title}</p>
        <p className="productdetails__price">
          <small>$</small>
          <strong>{location.state.price}</strong>
        </p>
        <p>{location.state.author}</p>
        <p>{location.state.page}</p>
        <p>{location.state.genre}</p>
        <p>{location.state.description}</p>
        <div className="productdetails__rating">
          {/* {Array(location.state.rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon />
              </p>
            ))} */}
        </div>
      </div>
      <img
        className="productdetails__image"
        src={location.state.image}
        alt=""
      />
      <button onClick={addToBasket}>Add To Cart</button>
    </div>
  );
}

export default ProductDetails;
