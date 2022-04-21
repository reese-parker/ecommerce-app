import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CartItem from "./CartItem";
import styles from "./styles/CartStyles.module.css";


export default function Cart({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
  
  const EmptyCart = () => (
    <p className={styles.emptyCartMessage}>
      You have no items in your shopping cart,
      <Link to="/store" className={styles.Link}>
        {" "}
        start adding some!
      </Link>
    </p>
  );

  const FilledCart = () => (
    <div className={styles.cartContainer}>
      <div className={styles.cartActionsContainer}>
        <p className={styles.subtotal}>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </p>
        <div className={styles.cartActionsButtons}>
          <Button
            className={styles.cartActionButton}
            variant="contained"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={styles.cartActionButton}
            variant="contained"
          >
            Checkout
          </Button>
        </div>
      </div>
      <Grid className={styles.itemsContainer} spacing={1} container>
        {cart.line_items.map((item) => (
          <Grid
            className={styles.itemContainer}
            item
            xs={12}
            sm={6}
            md={4}
            key={item.id}
          >
            <CartItem
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
              item={item}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );

  if (!cart.line_items)
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <section>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </section>
  );
}
