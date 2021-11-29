import React from "react";
import "../css/HomeComponent.css";
import BookContainer from "./BookContainer";

function HomeComponent({
  topList,
  popularList,
  romanceList,
  horrorList,
  thrillerList,
  scifiList,
  fictionList,
  mysteryList,
  basketItem,
  setBasketItem,
}) {
  return (
    <div className="homeContainer">
      {topList &&
      popularList &&
      romanceList &&
      horrorList &&
      thrillerList &&
      scifiList &&
      fictionList &&
      mysteryList ? (
        <div className="homeElement">
          <div className="homecomp__group">
            <p className="group__title">Top Rated</p>
            <button className="group__btn">see more</button>
          </div>
          {topList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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

          <div className="homecomp__group">
            <p className="group__title">Top Selling</p>
            <button className="group__btn">see more</button>
          </div>
          {popularList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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

          <div className="homecomp__group">
            <p className="group__title">Romance</p>
            <button className="group__btn">see more</button>
          </div>
          {romanceList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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

          <div className="homecomp__group">
            <p className="group__title">Horror</p>
            <button className="group__btn">see more</button>
          </div>
          {horrorList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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

          <div className="homecomp__group">
            <p className="group__title">Thriller</p>
            <button className="group__btn">see more</button>
          </div>
          {thrillerList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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

          <div className="homecomp__group">
            <p className="group__title">Science Fiction</p>
            <button className="group__btn">see more</button>
          </div>
          {scifiList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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

          <div className="homecomp__group">
            <p className="group__title">Fiction</p>
            <button className="group__btn">see more</button>
          </div>
          {fictionList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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

          <div className="homecomp__group">
            <p className="group__title">Mystery</p>
            <button className="group__btn">see more</button>
          </div>
          {mysteryList.map((book) => (
            <BookContainer
              id={book["isbn"]}
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
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default HomeComponent;
