import "../css/NavbarComponent.css";
import { BiSearch } from "react-icons/bi";
import { IoBagHandleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBarComponent = ({ basketItem, setBasketItem }) => {
  const [username, setUsername] = useState("");

  const authenticateHandler = (e) => {
    const userToken = localStorage.getItem("userToken");
    fetch("/auth/logout", {
      method: "GET",
      headers: { Authorization: "Bearer " + userToken },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsername();
      });
    localStorage.removeItem("userToken");
    console.log(localStorage.getItem("userToken"));
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      fetch("/auth/getcurrentuser", {
        method: "GET",
        headers: { Authorization: "Bearer " + userToken },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUsername(data["username"]);
        });
    }
  }, []);

  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div className="navbar__intro">
          <img
            className="navbar__logo"
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/books-2783553-2315348.png"
            alt=""
          />
          <span className="navbar__title">TITLE </span>
        </div>
      </Link>
      <div className="navbar__serach">
        <div className="navbar__searchInput">
          <input
            className="navbarsearch__field"
            type="text"
            placeholder="Search"
          />
        </div>
        <BiSearch className="navbar__searchIcon"></BiSearch>
      </div>

      <div className="navbar__nav">
        <Link to={!username && "/login"} className="link">
          <div onClick={authenticateHandler} className="navbar__option">
            <span className="navbar__optionLineOne">
              Hello {username ? username : "Guest"}
            </span>
            <span className="navbar__optionLineTwo">
              {username ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to={basketItem.length && "/checkout"} className="link">
          <div className="navbar__optionBasket">
            <IoBagHandleSharp className="basket__logo" size={30} />
            <span className="navbar__basketCount">{basketItem?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBarComponent;
