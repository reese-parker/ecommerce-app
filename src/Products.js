import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Product from "./Product";
import styles from "./styles/ProductsStyles.module.css";

const teams = [
  "Canucks",
  "Canadiens",
  "Flames",
  "Jets",
  "Maple Leafs",
  "Oilers",
  "Senators",
];

export default function Products({ products, handleAddToCart }) {
  const [teamFilter, setTeamFilter] = useState("");

  const handleChange = (event) => {
    setTeamFilter(event.target.value);
  };

  const productDisplay =
    teamFilter === ""
      ? products
      : products.filter((product) => product.categories[0].name === teamFilter);

  return (
    <section className={styles.container}>
      <h1>Authentic NHL jerseys.</h1>

      <div className={styles.filterContainer}>
        <p className={styles.filterLabel}>Filter by team</p>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="team-filter">Team</InputLabel>
          <Select
            labelId="team-filter"
            id="team-filter"
            value={teamFilter}
            label="Team"
            onChange={handleChange}
            className={styles.Section}
          >
            <MenuItem className={styles.MenuItem} value="">
              <em>All</em>
            </MenuItem>

            {teams.map((team) => (
              <MenuItem key={team} className={styles.MenuItem} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Grid className={styles.productsContainer} container spacing={4}>
        {productDisplay.map((product) => (
          <Grid
            className={styles.productContainer}
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Product product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
