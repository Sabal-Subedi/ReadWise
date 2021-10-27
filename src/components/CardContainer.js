import React from "react";
import Subtotal from "./Subtotal";

function CardContainer({ basketItem, setBasketItem }) {
  console.log(basketItem);
  return (
    <div className="cardcontainer">
      <div className="cardcontainer__left">
        <div>
          <h2 className="cardcontainer__title">My Cart</h2>
          {basketItem.map((book) => (
            <div className="cart__items">
              <img src={book["image"]} alt="" />
              <p>{book["title"]}</p>
              <p>{book["price"]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cardcontainer__right">
        <Subtotal basketItem={basketItem} />
      </div>
    </div>
  );
}

export default CardContainer;
