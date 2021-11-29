import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/ProductDetails.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

function ProductDetails({ basketItem, setBasketItem }) {
  const location = useLocation();
  const [volume, setVolume] = useState(1);

  const addToBasket = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");

    fetch("/profile/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        isbn: location.state.id,
        count: volume,
      }),
    }).then((res) => {
      res.json().then((r) => {
        if (res.status === 200) {
          setVolume(1);
        } else {
          alert(r["errmsg"]);
        }
      });
    });
  };

  const volumeincreaseHandler = (e) => {
    e.preventDefault();
    setVolume(volume + 1);
  };

  const volumedecreaseHandler = (e) => {
    e.preventDefault();

    volume ? setVolume(volume - 1) : setVolume(0);
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
            NRP. {location.state.price * volume}
          </div>
          <div className="productdetails__infoquantity">
            <div className="productdetails__icon">
              <BiChevronLeftCircle
                size={25}
                className="productdetails__icon"
                onClick={volumedecreaseHandler}
              />
            </div>
            <input
              type="text"
              className="productdetails__inputquantity"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
            <div className="productdetails__icon">
              <BiChevronRightCircle size={25} onClick={volumeincreaseHandler} />
            </div>
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
