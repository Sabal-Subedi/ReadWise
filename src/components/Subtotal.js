import React, { useState, useEffect } from "react";
import "../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";

function Subtotal() {
  const [cartItem, setCartItem] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    fetch("/profile/cart", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    }).then((res) => {
      res.json().then((r) => {
        if (res.status === 200) {
          console.log(res);
          console.log(r);
          const result = Object.values(r);
          console.log(result);
          setCartItem(result);
        } else {
          alert(r["errmsg"]);
        }
      });
    });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setChecked(!checked);
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Total ({cartItem?.length} items): <strong>{value}</strong>
            </p>
            <div className="subtotal__gift" onClick={handleChange}>
              {checked ? (
                <p className="subtotal__info">+ NRS 15 for gift wrapper </p>
              ) : (
                ""
              )}
              <button className="subtotal__giftbutton" onClick={handleChange}>
                This order contains gift
              </button>
            </div>
          </>
        )}
        decimalScale={2}
        value={
          checked
            ? cartItem?.reduce(
                (amount, item) => item.price * item.count + amount,
                15
              )
            : cartItem?.reduce(
                (amount, item) => item.price * item.count + amount,
                0
              )
        }
        displayType={"text"}
        thousandSeparator={true}
        prefix={"NPR "}
      />
      <button className="subtotal__button">Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
