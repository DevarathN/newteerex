import PageviewIcon from "@mui/icons-material/Pageview";
import axios from "axios";
import "./ProductListing.css";
import { Grid, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
const ProductListing = ({ counter }) => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [debounceTimerId, setDebounceTimerId] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [countVal, setCountVal] = useState(0);
  useEffect(() => {
    if (debounceTimerId !== 0) {
      clearTimeout(debounceTimerId);
    }
    const newTimerId = setTimeout(() => {
      apiCall(searchText);
    }, 800);
    setDebounceTimerId(newTimerId);
  }, [searchText]);
  async function apiCall(searchVal) {
    let url =
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

    const resp = await axios.get(url);
    const filteredData = resp.data.filter((item) =>
      item.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setProducts(filteredData);
  }
  const handlePositiveCount = (data) => {
    setCountVal((prevCount) => prevCount + data);

    counter((prevCount) => prevCount + data);
  };
  const handleNegativeCount = (data) => {
    setCountVal((prevCount) => prevCount - data);
    counter((prevCount) => prevCount - data);
  };
  const handleFilters = () => {
    // Get the state of the checkboxes
    let filteredData = products;
    const colorFilters = Array.from(
      document.querySelectorAll('input[name="color"]:checked')
    );
    const genderFilters = Array.from(
      document.querySelectorAll('input[name="gender"]:checked')
    );
    const priceFilters = Array.from(
      document.querySelectorAll('input[name="price"]:checked')
    );
    const typeFilters = Array.from(
      document.querySelectorAll('input[name="type"]:checked')
    );

    // Filter the products based on the checkboxes

    if (colorFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        colorFilters.some((el) => el.value === item.color)
      );
      setIsFilter(true);
    }
    if (genderFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        genderFilters.some((el) => el.value === item.gender)
      );
      setIsFilter(true);
    }
    if (priceFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        priceFilters.some((el) => {
          const [min, max] = el.value.split("-");
          return item.price >= parseInt(min) && item.price <= parseInt(max);
        })
      );
      setIsFilter(true);
    }
    if (typeFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        typeFilters.some((el) => el.value === item.type)
      );
      setIsFilter(true);
    }

    // Update the state with the filtered data

    setFilteredProducts(filteredData);
  };

  const toggleSidebar = () => {
    const sidebardiv = document.getElementById("sidebar-container");
    if (sidebardiv.style.visibility === "hidden") {
      sidebardiv.style.visibility = "visible";
    } else {
      sidebardiv.style.visibility = "hidden";
    }
  };
  const handleSearch = (e) => {
    setIsFilter(false);
    setSearchText(e.target.value);
  };
  return (
    <div className="product-listing">
      <div className="sidebar-container" id="sidebar-container">
        <p
          style={{
            textAlign: "left",
            fontSize: "small",
          }}
        >
          <strong> Colour </strong>{" "}
        </p>{" "}
        <div className="checkbox-label">
          <input
            name="color"
            value={"Red"}
            type="checkbox"
            onChange={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              <strong> Red </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="checkbox-label">
          <input
            name="color"
            value={"Blue"}
            type="checkbox"
            onChange={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              {" "}
              <strong> Blue </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="checkbox-label">
          <input
            name="color"
            value={"Green"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              <strong> Green </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <p
          style={{
            textAlign: "left",
            fontSize: "small",
          }}
        >
          <strong> Gender </strong>{" "}
        </p>{" "}
        <div className="checkbox-label">
          <input
            name="gender"
            value={"Men"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              <strong> Male </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="checkbox-label">
          <input
            name="gender"
            value={"Women"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              {" "}
              <strong> Female </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>
        <p
          style={{
            textAlign: "left",
            fontSize: "small",
          }}
        >
          <strong> Price </strong>{" "}
        </p>{" "}
        <div className="checkbox-label">
          <input
            name="price"
            value={" 0 - 250"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              <strong> ₹0 - ₹250 </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="checkbox-label">
          <input
            name="price"
            value={"250 - 450"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              {" "}
              <strong> ₹250 - ₹450 </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="checkbox-label">
          <input
            name="price"
            value={"450-"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              {" "}
              <strong> ₹450 + </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <p
          style={{
            textAlign: "left",
            fontSize: "small",
          }}
        >
          <strong> Type </strong>{" "}
        </p>{" "}
        <div className="checkbox-label">
          <input
            name="type"
            value={"Polo"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              <strong> Polo </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="checkbox-label">
          <input
            name="type"
            value={"Hoodie"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              {" "}
              <strong> Hoodie </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="checkbox-label">
          <input
            name="type"
            value={"Basic"}
            type="checkbox"
            onClick={handleFilters}
          />{" "}
          <div className="label-div">
            <label>
              {" "}
              <strong> Basic </strong>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="searchbar">
        <TextField
          value={searchText}
          onChange={handleSearch}
          style={{
            width: "20rem",
          }}
          variant="standard"
          placeholder="Search for products ..."
        />
        <PageviewIcon
          id="search-icon"
          style={{
            color: "rgb(153, 153, 153)",
            fontSize: "2.5rem",
          }}
        />

        <FilterAltOutlinedIcon
          id="filter-icon"
          onClick={toggleSidebar}
          style={{
            color: "rgb(153, 153, 153)",
            fontSize: "2.5rem",
          }}
        />
      </div>
      <div className="products">
        <h3>{countVal}</h3>
        <Grid container spacing={10}>
          {" "}
          {isFilter
            ? filteredProducts.map((item) => {
                return (
                  <Grid key={item.id} item xs={12} lg={4} md={6} xl={3}>
                    <ProductCard
                      onPositiveCountChange={handlePositiveCount}
                      onNegativeCountChange={handleNegativeCount}
                      imgLink={item.imageURL}
                      productTitle={item.name}
                      productPrice={item.price}
                      productQuantity={item.quantity}
                    />{" "}
                  </Grid>
                );
              })
            : products.map((item) => {
                return (
                  <Grid key={item.id} item xs={12} sm={6} lg={4} md={6} xl={3}>
                    <ProductCard
                      onPositiveCountChange={handlePositiveCount}
                      onNegativeCountChange={handleNegativeCount}
                      imgLink={item.imageURL}
                      productTitle={item.name}
                      productPrice={item.price}
                      productQuantity={item.quantity}
                    />{" "}
                  </Grid>
                );
              })}{" "}
        </Grid>{" "}
      </div>{" "}
    </div>
  );
};
export default ProductListing;
