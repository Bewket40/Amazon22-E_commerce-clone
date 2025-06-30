import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/MyLoader";
//npm i axios----install axios and import it above

function Product() {
  const [products, setProducts] = useState([]); //initialize products as an empty array to ensure .map() works on the first render, as .map() works on empty arrays — it just returns an empty array.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load products.");
        setIsLoading(false);
      });
  }, []);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;

// Or consider this for better readability:

// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://fakestoreapi.com/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProducts();
// }, []);
