import React from "react";
import classes from "./Category.module.css"
import { Link } from "react-router-dom";
function CategoryCard({ data }) {
  return (
    <>
      <div className={classes.category}>
        <Link to={`/category/${data.name}`}>
          {/* The route address "/category/${data.name}" in addition to routing to the address(to "Results" page according to the indicated "element item" in the Router component), displays "/category/+ a dynamic endpoint" on the browser's navigation bar when any of it's different rendered card is clicked */}
          <span>
            <h2>{data.title}</h2>
          </span>
          <img src={data.imgLink} alt={data.title} />
          <p>shop now</p>
        </Link>
      </div>
    </>
  );
}

export default CategoryCard;
