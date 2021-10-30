import React, { useState } from "react";
import "../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";

function Subtotal({ basketItem }) {
  const [checked, setChecked] = useState(false);
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
              Total ({basketItem?.length} items): <strong>{value}</strong>
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
            ? basketItem?.reduce(
                (amount, item) => item.price * item.quantity + amount,
                15
              )
            : basketItem?.reduce(
                (amount, item) => item.price * item.quantity + amount,
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
