import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import "./ProductCard.css";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { SnackbarProvider, useSnackbar } from "notistack";
const ProductCard = ({
  imgLink,
  productPrice,
  productTitle,
  productQuantity,
  onPositiveCountChange,
  onNegativeCountChange,
}) => {
  const [addtoCartClick, setAddToCartClick] = useState(false);
  const [counterVal, setCounterVal] = useState(0);
  const [product, setProduct] = useState({
    productname: productTitle,
    productImg: imgLink,
    productprice: productPrice,
    productquantity: counterVal,
  });
  // Store the updated cart items in localStorage

  useEffect(() => {
    // This code will be executed when counterVal changes
    // Add your logic here that needs to be executed when counterVal changes
    // You can also call a function or perform any other actions here
    // For example, you can update the product quantity in the state
    setProduct((prevProduct) => ({
      ...prevProduct,
      productquantity: counterVal,
    }));
  }, [counterVal]);
  const { enqueueSnackbar } = useSnackbar();
  const addCounter = () => {
    if (counterVal + 1 > productQuantity) {
      enqueueSnackbar("Quantity maxed out", {
        variant: "error",
      });

      setCounterVal(counterVal);
    } else {
      setCounterVal(counterVal + 1);
      onPositiveCountChange(1);
    }
  };
  const subtractCounter = () => {
    if (counterVal - 1 === 0) {
      onNegativeCountChange(1);
      setAddToCartClick(false);
    }
    if (counterVal > 1) {
      setCounterVal(counterVal - 1);
      onNegativeCountChange(1);
    }
  };
  const handleAddToCart = () => {
    setAddToCartClick(true);
    setCounterVal(1);
    onPositiveCountChange(1);
  };
  return (
    <Card className="card-body">
      <CardContent>
        <CardMedia className="card-media" component="img" image={imgLink} />
        <Typography
          style={{
            padding: "0.3rem",
          }}
        >
          {" "}
          {productTitle}{" "}
        </Typography>{" "}
        <Typography
          style={{
            padding: "0.3rem",
            fontWeight: "bold",
          }}
        >
          {" "}
          ₹{productPrice}{" "}
        </Typography>
        {addtoCartClick ? (
          <>
            <Button
              style={{
                backgroundColor: "gray",
                width: "10rem",
              }}
              fullWidth
              variant="contained"
              endIcon={<AddIcon onClick={addCounter} />}
              startIcon={<RemoveIcon onClick={subtractCounter} />}
            >
              {counterVal}{" "}
            </Button>{" "}
          </>
        ) : (
          <Button
            style={{
              backgroundColor: "gray",
              width: "10rem",
            }}
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add To Cart{" "}
          </Button>
        )}{" "}
      </CardContent>{" "}
    </Card>
  );
};
export default ProductCard;
