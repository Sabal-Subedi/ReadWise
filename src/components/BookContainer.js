import React from "react";
import "../css/BookComponent.css";
import { IoBagAddSharp } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";

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
    <div className="product">
      <div onClick={bookDetailHandler}>
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            {/* {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon />
              </p>
            ))} */}
          </div>
        </div>
        <img className="product__image" src={image} alt="" />
      </div>
      <button onClick={addToBasket}>
        Add To Basket <IoBagAddSharp size={15} />
      </button>
    </div>
  );
}

export default BookContainer;
