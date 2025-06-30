import React from "react";
// import Layout from "../../components/Layout/Layout"; //Netlify deployment commented this as reason for deployment error
import Layout from "../../components/LayOut/LayOut"
import Carousel from "../../components/Carousel/CarouselEffect";
import Category from "../../components/Category/Category"; //Unless updated he went with CategoryCard here, mistake????????
import Product from "../../components/Product/Product"
function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
