import React from "react";
import { categoryInfos } from "./categoryFullInfos"; //Using locally available &/or static data
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";
function Category() {
  return (
    <>
      <section className={classes.category_container}>
        {categoryInfos.map((infos, index) => {          //Mapping on locally sourced &/or static data
          return <CategoryCard data={infos} key={index} renderAdd={true} />;
        })}
      </section>
    </>
  );
}

export default Category;

// function Category() {
//   return (
//     <section>
//       {categoryInfos.map((infos, index) => (
//         <CategoryCard key={index} data={infos} />
//       ))}
//     </section>
//   );
// }

// export default Category;----------------better and simple code (uses implicit return with ())
