import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import "./Product.css";
import { useHistory, Link } from "react-router-dom";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import Header from "./Header";
import ProductListing from "./ProductListing";
import { InputAdornment, TextField } from "@mui/material";
const Product = () => {
  const [newcount, setNewCount] = useState(0);
  const handleCount = (data) => {
    setNewCount(data);
  };
  localStorage.setItem("items", newcount);
  return (
    <>
      <Header count={localStorage.getItem("items")} />
      <Box className="product-body">
        <ProductListing counter={handleCount} />
      </Box>
    </>
  );
};
export default Product;
