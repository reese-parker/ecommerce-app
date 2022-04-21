import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./styles/NavbarStyles.module.css";

export default function Navbar(props) {
  const { totalItems } = props;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" className={styles.AppBar} color="inherit">
        <Toolbar className={styles.Toolbar}>
          <IconButton onClick={handleClick}>
            <MenuIcon className={styles.MenuIconButton} />
          </IconButton>

          <span
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            className={styles.title}
          >
            HOCKEY JERSEY EMPORIUM
          </span>

          <div className={styles.links}>
            <Button
              component="a"
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
              className={styles.link}
            >
              Home
            </Button>
            <Button
              component="a"
              onClick={() => {
                navigate("/store");
                window.scrollTo(0, 0);
              }}
              className={styles.link}
            >
              Store
            </Button>
          </div>

          <IconButton
            className={styles.cartButton}
            onClick={() => {
              navigate("/cart");
              window.scrollTo(0, 0);
            }}
            aria-label="Show cart items"
            color="inherit"
          >
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={{ fontWeight: 700 }}
            onClick={() => {
              handleClose();
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            sx={{ fontWeight: 700 }}
            onClick={() => {
              handleClose();
              navigate("/store");
              window.scrollTo(0, 0);
            }}
          >
            Store
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
