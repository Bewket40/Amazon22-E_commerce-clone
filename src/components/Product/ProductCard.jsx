import React, { useContext } from "react";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
// npm install @mui/material @emotion/react @emotion/styled-----install from MUI library & import it for the rating element
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
// npm install numeral ------install from Numeral.js for the rating counter
import { Type } from "../../utils/action.type";
function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product; //Destructuring the prop "product"

  const [state, dispatch] = useContext(DataContext); // import useContext, DataContext from our component and {Type} from utils

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  }; //***************************Add it in the add to cart button in the return statement*/

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} /> {/*count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;

//Note that this component is going to be used by any component who includes it in its return statement and gives it the same prop named "product" as follows
// return (
//   ...... other code (if any)
//     <ProductCard product={the data with image, title, id, rating & price in it} />
//     ..... other code (if any)
// );
