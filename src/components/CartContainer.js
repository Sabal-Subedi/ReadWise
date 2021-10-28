import React from "react";
import Subtotal from "./Subtotal";
import "../css/CartContainer.css";
import Footer from "./Footer";
function CartContainer({ basketItem, setBasketItem }) {
  console.log(basketItem);
  return (
    <div className="cartcontainer">
      <div className="cartcontainer__left">
        <div className="cartcontainer__leftbox">
          <div className="card__header">
            <h2 className="cartcontainer__title">My Cart</h2>
          </div>
          {basketItem.map((book) => (
            <div className="cart__items">
              <img className="cart__image" src={book["image"]} alt="" />
              <div className="cart__itemstitle">
                {book["title"]}
                <div className="cart__itemsquantity">
                  <button className="cart__itemsremove">remove</button>
                </div>
              </div>
              <div className="cart__itemsprice">Price:{book["price"]}</div>
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
