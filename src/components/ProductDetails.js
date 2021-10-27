import React from "react";
import { useLocation } from "react-router-dom";
import "../css/ProductDetails.css";

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
        image: location.state.image,
      },
    ]);
  };

  return (
    <div className="productdetailswrapper">
      <div className="productdetails__infoimage">
        <img
          className="productdetails__image"
          src={location.state.image}
          alt=""
        />
      </div>
      <div className="productdetails__info">
        <div className="productdetails__infotitle">{location.state.title}</div>

        <div className="productdetails__infoauthor">
          <p>By {location.state.author},</p>
        </div>

        <div className="productdetails__infogenre">
          <p>Genre: {location.state.genre}</p>
        </div>
        <p className="productdetails__synopsis">Synopsis</p>
        <div className="productdetails__infodesc">
          <p>{location.state.description}</p>
        </div>
      </div>
      <div className="productdetails__infobutton">
        <div className="productdetails__infobuttonbox">
          <div className="productdetails__infoprice">
            NRP. {location.state.price}
          </div>
          <button className="productdetails__cartbutton" onClick={addToBasket}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
