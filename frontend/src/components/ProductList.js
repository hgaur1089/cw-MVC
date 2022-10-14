import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./productListItem.css";

import ProductListItem from "./ProductListItem";
import { fetchProducts, fetchFilteredProducts } from "../actions";

function ProductList(props) {
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { products, filters, dispatch } = props;
  const { loading, list, pageno: productPageNo } = products;
  const { filterRange, filterCategories, filterBrands, filteredProducts, pageno: filtersPageNo } = filters;

  const pageno = filteredProducts.length !== 0 ? filtersPageNo : productPageNo;
  var data = list;
  if(filteredProducts.length !== 0) {
    data = filteredProducts;
  } else if(filterRange.length !== 0 || filterCategories.length !== 0 || filterBrands.length !== 0) {
    data = [];
  } else {
    data = list;
  }

  const renderProducts = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (data.length === 0) {
      return <div>No products found</div>;
    }
    return data.map((product) => (
      <ProductListItem key={product.id} product={product} />
    ));
  };

  const handlePageChange = (pageno) => {
    if (filteredProducts.length !== 0) {
      dispatch(fetchFilteredProducts(pageno));
    } else {
      dispatch(fetchProducts(pageno));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>
        <h1>Product List</h1>
      </div>
      <div style={styles.productList}>{renderProducts()}</div>

      <div style={styles.pagination}>
        <button
          style={styles.button}
          onClick={() => handlePageChange(pageno - 1)}
        >
          Previous
        </button>
        <button
          style={styles.button}
          onClick={() => handlePageChange(pageno + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    filters: state.filters,
  };
}

export default connect(mapStateToProps)(ProductList);

const styles = {
  heading: {
    textAlign: "center",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "38px 20px",
    padding: " 0 2em",
    width: "100%",
    maxWidth: "1000px",
  },
  loadingCSS: {
    height: "100px",
    margin: "30px",
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    maxWidth: "1000px",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#f0c14b",
    color: "#111",
    cursor: "pointer",
  },
};
