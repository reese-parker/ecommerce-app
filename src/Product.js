import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styles from "./styles/ProductStyles.module.css";

export default function Product({ product, handleAddToCart }) {
  const [size, setSize] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Snackbar handlers

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarMessage("");
    setSnackbarOpen(false);
  };

  // Add to cart handlers

  const sizeGroupId = product.variant_groups[0].id;
  const sizes = product.variant_groups[0].options;

  const handleSelectSize = (e) => {
    setSize(e.target.value);
  };

  const onAddToCart = () => {
    if (!size) {
      openSnackbar("Choose a size first");

      return;
    } else {
      handleAddToCart(product.id, 1, { [sizeGroupId]: size });
      openSnackbar("Item added to cart");
    }
  };

  return (
    <Card className={styles.container}>
      <CardMedia
        className={styles.CardMedia}
        image={product.image.url}
        title={product.name}
      />
      <CardContent className={styles.CardContent}>
        <p className={styles.productName}>{product.name}</p>
        <span className={styles.price}>
          {product.price.formatted_with_symbol}
        </span>
      </CardContent>
      <CardActions className={styles.CardActions}>
        <FormControl className={styles.sizeContainer} required>
          <label className={styles.formLabel}>Size</label>
          <RadioGroup row>
            {sizes.map((size) => (
              <FormControlLabel
                key={size.id}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: ".7rem",
                  },
                }}
                className={styles.radioButtonContainer}
                onChange={(e) => handleSelectSize(e)}
                value={size.id}
                labelPlacement="bottom"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 14,
                        padding: "0 0px",
                      },
                    }}
                  />
                }
                label={size.name}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <IconButton
          onClick={() => {
            onAddToCart();
          }}
          aria-label="Add to Cart"
          className={styles.cartIcon}
        >
          <AddShoppingCartIcon />
        </IconButton>
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
