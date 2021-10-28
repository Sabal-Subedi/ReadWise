import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartContainer from "./components/CartContainer";
import HomeComponent from "./components/HomeComponent";
import LoginPage from "./components/LoginPage";
import NavBarComponent from "./components/NavbarComponent";
import ProductDetails from "./components/ProductDetails";
import RegistrationPage from "./components/RegistrationPage";
// import SearchBooks from "./components/SearchBooks";

function App() {
  const [topList, setTopList] = useState(null);
  const [popularList, setPopularList] = useState(null);
  const [fictionList, setFictionList] = useState(null);
  const [romanceList, setRomanceList] = useState(null);
  const [horrorList, setHorrorList] = useState(null);
  const [mysteryList, setMysteryList] = useState(null);
  const [scifiList, setScifiList] = useState(null);
  const [thrillerList, setThrillerList] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const [basketItem, setBasketItem] = useState([]);

  useEffect(() => {
    setUserToken(localStorage.getItem("userToken"));
    fetch("/books/gettopbooks?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setTopList(result);
      });

    fetch("/books/getmostpopular?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setPopularList(result);
      });

    fetch("/books/gettopfiction?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setFictionList(result);
      });

    fetch("/books/gettopromance?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setRomanceList(result);
      });

    fetch("/books/gettophorror?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setHorrorList(result);
      });

    fetch("/books/gettopmystery?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setMysteryList(result);
      });

    fetch("/books/gettopthriller?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setThrillerList(result);
      });

    fetch("/books/gettopscifi?count=6")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setScifiList(result);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/checkout">
            <NavBarComponent
              basketItem={basketItem}
              setBasketItem={setBasketItem}
              userToken={userToken}
              setUserToken={setUserToken}
            />
            <CartContainer
              basketItem={basketItem}
              setBasketItem={setBasketItem}
            />
          </Route>
          <Route path="/productdetails">
            <NavBarComponent
              basketItem={basketItem}
              setBasketItem={setBasketItem}
              userToken={userToken}
              setUserToken={setUserToken}
            />
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
              userToken={userToken}
              setUserToken={setUserToken}
            />
            <HomeComponent
              topList={topList}
              popularList={popularList}
              romanceList={romanceList}
              horrorList={horrorList}
              thrillerList={thrillerList}
              scifiList={scifiList}
              fictionList={fictionList}
              mysteryList={mysteryList}
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
