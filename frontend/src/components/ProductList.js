import React from "react";

import "./productListItem.css";
import ProductListItem from "./ProductListItem";
import { fetchProducts } from "../actions";

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
    const { loading } = products;

    const list = products.filteredProducts.length !== 0 ? products.filteredProducts : products.list;

    return ( 
      <div style={styles.container}>
        <div style={styles.heading}>
          <h1>Product List</h1>
        </div>
        <div style={styles.productList}>
          {list.map((product, index) => (
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
};

export default ProductList;
