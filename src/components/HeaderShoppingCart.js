import { Avatar, Button, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { Height, Search, SentimentDissatisfied } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const HeaderShoppingCart = ({ count }) => {
  const navigate = useNavigate();
  const cart = () => {
    navigate("/cart");
  };
  const homeButton = () => {
    navigate("/");
  };
  const productButton = () => {
    navigate("/");
  };
  return (
    <>
      <Box className="header">
        {/* <Button> */}
        <Button
          style={{ textTransform: "none" }}
          variant="text"
          onClick={homeButton}
          size="large"
        >
          <strong style={{ color: "black" }}>{"TeeRex Store"}</strong>
        </Button>
        <div className="products-cart">
          <IconButton
            onClick={cart}
            name="Open shopping cart"
            size="large"
            color="gray"
          >
            <span>
              <ShoppingCartOutlinedIcon />
              <sup className="my-sup">{count}</sup>
            </span>
          </IconButton>
        </div>
        {/* </Button> */}
      </Box>
    </>
  );
};
export default HeaderShoppingCart;
