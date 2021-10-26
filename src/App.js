import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import LoginPage from "./components/LoginPage";
import NavBarComponent from "./components/NavbarComponent";
import ProductDetails from "./components/ProductDetails";
import RegistrationPage from "./components/RegistrationPage";
// import SearchBooks from "./components/SearchBooks";

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
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/productdetails">
            <ProductDetails
              basketItem={basketItem}
              setBasketItem={setBasketItem}
            />
          </Route>
          <Route path="/register">
            <RegistrationPage />
          </Route>
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
