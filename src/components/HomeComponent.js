import React from "react";
import "../css/HomeComponent.css";
import BookContainer from "./BookContainer";

function HomeComponent({ bookList, basketItem, setBasketItem }) {
  return (
    <div className="homeContainer">
      {bookList ? (
        <div className="homeElement">
          <div className="homecomp__group">Best Selling:</div>
          {bookList.map((book) => (
            <BookContainer
              id={book["id"]}
              author={book["author"]}
              description={book["description"]}
              title={book["title"]}
              page={book["page"]}
              genre={book["genre"]}
              image={book["image_url"]}
              rating={book["rating"]}
              price={parseInt(book["price"])}
              setBasketItem={setBasketItem}
              basketItem={basketItem}
            />
          ))}
          <div className="homecomp__group">Best rated:</div>
          {bookList.map((book) => (
            <BookContainer
              id={book["8"]}
              author={book["author"]}
              title={book["title"]}
              page={book["page"]}
              genre={book["genre"]}
              image={book["image_url"]}
              rating={book["rating"]}
              price={parseInt(book["price"])}
              setBasketItem={setBasketItem}
              basketItem={basketItem}
            />
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default HomeComponent;
