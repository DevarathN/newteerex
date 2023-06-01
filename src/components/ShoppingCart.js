import HeaderShoppingCart from "./HeaderShoppingCart";
const ShoppingCart = () => {
  return (
    <>
      <HeaderShoppingCart count={localStorage.getItem("items")} />
      <h2>Shopping Cart</h2>
      <div>{localStorage.getItem("cartItems")})</div>
    </>
  );
};
export default ShoppingCart;
