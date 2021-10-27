import "../css/NavbarComponent.css";
import { BiSearch } from "react-icons/bi";
import { IoBagHandleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBarComponent = ({ basketItem, setBasketItem }) => {
  const authenticateHandler = () => {};

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
        <Link to="/login" className="link">
          <div onClick={authenticateHandler} className="navbar__option">
            <span className="navbar__optionLineOne">
              Hello Guest
              {/* Hello {user ? user.email : "Guest"} */}
            </span>
            <span className="navbar__optionLineTwo">
              Sign In
              {/* {user ? "Sign Out" : "Sign In"} */}
            </span>
          </div>
        </Link>

        <Link to="/checkout" className="link">
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
