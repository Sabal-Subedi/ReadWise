import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import NavBarComponent from "./components/NavbarComponent";
import SearchBooks from "./components/SearchBooks";

function App() {
  const [bookList, setBookList] = useState(null);
  const [basketItem, setBasketItem] = useState([]);

  useEffect(() => {
    fetch("/getbooklist")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        // console.log(result);
        // result.map((re) => console.log(re));
        setBookList(result);

        // setBookList(data);
      });
  }, []);

  console.log(bookList);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <NavBarComponent
              basketItem={basketItem}
              setBasketItem={setBasketItem}
            />
            <HomeComponent
              bookList={bookList}
              basketItem={basketItem}
              setBasketItem={setBasketItem}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
