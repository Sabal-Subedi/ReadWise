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

    const index = basketItem.findIndex((book) => book.title === title);

    if (index >= 0) {
      const count = basketItem[index].quantity;
      console.log(count);
      basketItem.splice(index, 1);
      setBasketItem([
        ...basketItem,
        {
          id: id,
          title: title,
          price: price,
          image: image,
          quantity: count + 1,
        },
      ]);
    } else {
      setBasketItem([
        ...basketItem,
        {
          id: id,
          title: title,
          price: price,
          image: image,
          quantity: 1,
        },
      ]);
    }
  };

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
    <div className="bookcontainer">
      <div className="card">
        <img
          className="bookcontiner__image"
          src={image}
          alt=""
          onClick={bookDetailHandler}
        />
        <div className="bookcontainer__title" onClick={bookDetailHandler}>
          <p>{title}</p>

          <p className="bookcontainer__price">NRP. {price}</p>
        </div>

        {/* <button className="bookcontainer__button" onClick={addToBasket}>
          Add To Cart
        </button> */}
      </div>
    </div>
  );
}

export default BookContainer;
