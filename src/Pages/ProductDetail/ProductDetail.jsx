import React from "react";
import classes from "./ProductDetail.module.css";
// import Layout from "../../components/Layout/Layout";
import Layout from "../../components/LayOut/LayOut"
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/MyLoader"; //Spinner

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        SetIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        SetIsLoading(false);
      });
  }, []);
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
  // return (
  //   <Layout>
  //     {product && product.id ? (
  //       <ProductCard product={product} />
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </Layout>
  // );
}

export default ProductDetail;
