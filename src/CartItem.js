import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Snackbar from "@mui/material/Snackbar";
import styles from "./styles/CartItemStyles.module.css";

export default function CartItem({
  item,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarMessage("");
    setSnackbarOpen(false);
  };

  const size = item.selected_options[0].option_name;

  return (
    <Card className={styles.container}>
      <CardMedia
        className={styles.CardMedia}
        image={item.image.url}
        alt={item.name}
      />
      <CardContent className={styles.CardContent}>
        <p className={styles.itemName}>{item.name}</p>
        <p className={styles.size}>SIZE : {size}</p>
        <span className={styles.price}>{item.price.formatted_with_symbol}</span>
      </CardContent>
      <CardActions className={styles.CardActions}>
        <div className={styles.quantityButtons}>
          <Button
            sx={{ fontWeight: 800 }}
            type="button"
            size="small"
            onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <span className={styles.quantity}>{item.quantity}</span>
          <Button
            sx={{ fontWeight: 800 }}
            type="button"
            size="small"
            onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          className={styles.removeButton}
          variant="contained"
          onClick={() => {
            handleRemoveFromCart(item.id);
            openSnackbar("Removed item from cart");
          }}
        >
          Remove
        </Button>
      </CardActions>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Card>
  );
}
