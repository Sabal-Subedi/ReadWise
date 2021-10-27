import React from "react";
import Subtotal from "./Subtotal";

function CartContainer({ basketItem, setBasketItem }) {
  console.log(basketItem);
  return (
    <div className="cartcontainer">
      <div className="cartcontainer__left">
        <div>
          <div className="card__header">
            <h2 className="cartcontainer__title">My Cart</h2>
          </div>
          {basketItem.map((book) => (
            <div className="cart__items">
              <img className="cart__image" src={book["image"]} alt="" />
              <p>{book["title"]}</p>
              <p>{book["price"]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cartcontainer__right">
        <Subtotal basketItem={basketItem} />
      </div>
    </div>
  );
}

export default CartContainer;
