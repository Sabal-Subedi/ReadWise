import React from "react";
import "../css/BookComponent.css";
import { useHistory } from "react-router-dom";

function BookContainer({
  id,
  author,
  description,
  page,
  rating,
  title,
  genre,
  image,
  price,
  basketItem,
  setBasketItem,
}) {
  const history = useHistory();

  const addToBasket = (e) => {
    e.preventDefault();
    setBasketItem([
      ...basketItem,
      {
        id: id,
        title: title,
        price: price,
      },
    ]);
  };
  console.log(basketItem);

  const bookDetailHandler = (e) => {
    e.preventDefault();
    history.push("/productdetails", {
      id: id,
      author: author,
      title: title,
      page: page,
      genre: genre,
      image: image,
      description: description,
      rating: rating,
      price: price,
    });
  };

  return (
    <div className="bookcontainer" onClick={bookDetailHandler}>
      <div className="card">
        <img className="bookcontiner__image" src={image} alt="" />
        <div className="bookcontainer__title">
          <p>{title}</p>

          <p className="bookcontainer__price">
            <small>$</small>
            {price}
          </p>
        </div>

        <button className="bookcontainer__button" onClick={addToBasket}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default BookContainer;
