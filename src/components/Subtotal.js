import React from "react";
import "../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";

function Subtotal({ basketItem }) {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basketItem?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains gift
            </small>
          </>
        )}
        decimalScale={2}
        value={basketItem?.reduce((amount, item) => item.price + amount, 0)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"NPR "}
      />
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
