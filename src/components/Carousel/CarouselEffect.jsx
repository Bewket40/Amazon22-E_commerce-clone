import React from 'react'
// npm i react-responsive-carousel---install first
import { Carousel } from 'react-responsive-carousel';
import {img} from "./img/data"
//import "react-responsive-carousel/lib/styles/carousel.min.css";----a copy paste code for style effects to work
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css"; // I had to manually write it
function CarouselEffect() {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false} //showIndicators with ...s
        showThumbs={false}
      >
        {img.map((imageItemLink) => {
          return <img src={imageItemLink} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </>
  );
}

export default CarouselEffect