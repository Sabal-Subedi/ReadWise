import React from "react";
import "../css/HomeComponent.css";
import BookContainer from "./BookContainer";

function HomeComponent({ bookList, basketItem, setBasketItem }) {
  return (
    <div className="homeContainer">
      {bookList ? (
        <div>
          <h1>LIST OF BOOK </h1>
          {/* {bookList[0]["Book-Title"]} */}
          {bookList.map((book) => (
            <BookContainer
              id={book["id"]}
              author={book["author"]}
              title={book["title"]}
              page={book["page"]}
              genre={book["genre"]}
              image={book["image_url"]}
              rating={book["rating"]}
              price={book["price"]}
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
