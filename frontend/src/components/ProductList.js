import React from "react";

import "./productListItem.css";
import ProductListItem from "./ProductListItem";
import { fetchProducts, fetchFilteredProducts } from "../actions";

class ProductList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const store = this.props.store;
    store.subscribe(() => {
      this.forceUpdate();
    });
    store.dispatch(fetchProducts());
  }

  render() {
    const { products } = this.props.store.getState();
    const { dispatch } = this.props.store;
    const { loading, pageno, filteredProducts, list } = products;
    console.log("products = ", pageno, list);

    const data = filteredProducts.length !== 0 ? filteredProducts : list;

    return ( 
      <div style={styles.container}>
        <div style={styles.heading}>
          <h1>Product List</h1>
        </div>
        <div style={styles.productList}>
          {data.map((product, index) => (
            <ProductListItem
              name={product.title}
              description={product.description}
              price={product.price}
              discount={product.discount}
              rating={product.rating}
              quantity={product.stock}
              image={product.imageurl}
              brand={product.brand}
              category={product.category}
              key={`product-${index}`}
            />
          ))}
        </div>

        {loading && <div><h1>Loading...</h1></div>}
        
        <div style={styles.pagination}>
          <button
            style={styles.button}
            onClick={() => {
              if(pageno > 0) {
                if(filteredProducts.length !== 0) {
                  dispatch(fetchFilteredProducts(pageno - 1));
                } else {
                  dispatch(fetchProducts(pageno - 1));
                }
              }
            }}
          >
            Previous
          </button>
          <button
            style={styles.button}
            onClick={() => {
              if(filteredProducts.length !== 0) {
                console.log("pageno = ", pageno);
                dispatch(fetchFilteredProducts(pageno + 1));
              } else {
                dispatch(fetchProducts(pageno + 1));
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

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

export default ProductList;
