import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Product from "./Product";
import styles from "./styles/FavouriteProductsCarouselStyles.module.css";

export default function FavouriteProductsCarousel({
  favouriteProducts,
  handleAddToCart,
}) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className={styles.container}
    >
      {favouriteProducts[0] !== undefined &&
        favouriteProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className={styles.productContainer}>
              <Product product={product} handleAddToCart={handleAddToCart} />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
