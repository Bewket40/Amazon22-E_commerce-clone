import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
// import Layout from "../../components/Layout/Layout";//Caused Netlify deployment problem
import Layout from "../../components/LayOut/LayOut"
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints"; //Our base url defined in Api endpoint.js
import ProductCard from "../../components/Product/ProductCard"; //ProductCard is going to be connected to "Results" component as a secondary source of probs(data), in addition to "Product" component. So, it renders both interchangibly.
import Loader from "../../components/Loader/MyLoader";

function Results() {
  const { BereketEndPoint } = useParams(); //useParams reads the URL part after the colon : (the dynamic parameter) and gives it to us.
  // console.log(BereketEndPoint); //This will console results whenever a category card is clicked
  const [results, setResults] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${BereketEndPoint}`) //All are common to all the product categories except 'BereketEndPoint'.
      .then((res) => {
        setResults(res.data);
        SetIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        SetIsLoading(false);
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {BereketEndPoint}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
export default Results;
