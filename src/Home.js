import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import leafsCrest from "./images/leafsCrest.jpeg";
import primegreenLogo from "./images/primegreenLogo.jpeg";
import FavouriteProductsCarousel from "./FavouriteProductsCarousel";
import Product from "./Product";
import styles from "./styles/HomeStyles.module.css";

export default function Home({ products, handleAddToCart }) {
  const navigate = useNavigate();
  const favouriteProducts = [products[2], products[7], products[14]];

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <img className={styles.leafsCrest} alt="" src={leafsCrest} />
        <p className={styles.title}>
          Your team. <br />
          Your jersey.
        </p>

        <Button
          onClick={() => {
            navigate("/store");
            window.scrollTo(0, 0);
          }}
          variant="outlined"
          className={styles.shopNowButton}
        >
          Shop now
        </Button>
      </div>
      <div className={styles.favouritesContainer}>
        <p className={styles.favouritesTitle}>Our Favourites</p>
        {/* Mobile view carousel */}
        <FavouriteProductsCarousel
          favouriteProducts={favouriteProducts}
          handleAddToCart={handleAddToCart}
        />
        {/* Desktop view */}
        <Grid
          className={styles.desktopFavouritesContainer}
          container
          spacing={4}
        >
          {favouriteProducts[0] !== undefined &&
            favouriteProducts.map((product) => (
              <Grid item xs={4} key={product.id}>
                <Product product={product} handleAddToCart={handleAddToCart} />
              </Grid>
            ))}
        </Grid>
      </div>
      <div className={styles.primegreenContainer}>
        <img className={styles.primegreenLogo} alt="" src={primegreenLogo} />
        <p className={styles.primegreenTitle}>
          Made with 100% recycled materials.
        </p>
      </div>
      <div className={styles.shippingContainer}>
        <p className={styles.shippingTitle}>
          Next day shipping and free returns.
        </p>
        <p className={styles.shippingInfo}>
          It's never been easier to get your favourite team's jersey
        </p>
        <Button
          onClick={() => {
            navigate("/store");
            window.scrollTo(0, 0);
          }}
          className={styles.seeCollectionButton}
          variant="contained"
        >
          See the collection
        </Button>
      </div>
    </section>
  );
}
