import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchBrands,
  fetchCategories,
  setFilterCategory,
  setFilterBrand,
  setFilterRange,
  fetchFilteredProducts,
  clearFilters,
} from "../actions";
import ListButtons from "./ListButtons";

const range = [
  { id: 1, name: "<100", min_price: 0, max_price: 100 },
  { id: 2, name: "100-300", min_price: 100, max_price: 300 },
  { id: 3, name: "300-600", min_price: 300, max_price: 600 },
  { id: 4, name: "600-1000", min_price: 600, max_price: 1000 },
  { id: 5, name: "1000-1500", min_price: 1000, max_price: 1500 },
  { id: 6, name: ">1500", min_price: 1500, max_price: 20000 },
];

function Filters(props) {

  const { products, filters, dispatch } = props;
  const { categories, brands } = products;
  const { filteredProducts } = filters;

  const handleClickRange = (id) => {
    const minPrice = range[id - 1].min_price;
    const maxPrice = range[id - 1].max_price;
    dispatch(setFilterRange({ minPrice, maxPrice }));
    dispatch(fetchFilteredProducts());
  };

  const handleClickCategory = (category) => {
    dispatch(setFilterCategory(category));

    const { filterCategories } = filters;
    dispatch(fetchBrands(filterCategories));
    dispatch(fetchFilteredProducts());
  };

  const handleClickBrand = (brand) => {
    dispatch(setFilterBrand(brand));
    dispatch(fetchFilteredProducts());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const renderFilterOptions = (data, type) => {
    if (data.length === 0) {
      return;
    }
    return (
      <div style={styles.filterList}>
        <div style={styles.filter}>
          <h3>{type}</h3>
          <div style={styles.listContainer}>
            {data.map((item) => (
              <ListButtons
                key={item.id}
                list={item}
                handleClick={
                  type === "Range"
                    ? handleClickRange
                    : type === "Categories"
                    ? handleClickCategory
                    : handleClickBrand
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderClearFilters = () => {
    if (
      filteredProducts.length !== 0 ||
      filters.filterCategories.length !== 0 ||
      filters.filterBrands.length !== 0
    ) {
      return (
        <button style={styles.clearButton} onClick={handleClearFilters}>
          Clear Filters
        </button>
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>
        <h1>Filters</h1>
      </div>
      {renderFilterOptions(range, "Range")}
      {renderFilterOptions(categories, "Categories")}
      {renderFilterOptions(brands, "Brands")}
      
        {renderClearFilters()}
    
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    filters: state.filters,
  };
}

export default connect(mapStateToProps)(Filters);

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  heading: {
    textAlign: "center",
  },
  filterList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  filter: {
    width: "60%",
    height: "100%",
    display: "flex",
  },
  clearButton: {
    width: "60%",
    height: "40px",
    backgroundColor: "#5181fd",
    border: "4px solid #5181fd",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "10px",
    cursor: "pointer",
  },
};
