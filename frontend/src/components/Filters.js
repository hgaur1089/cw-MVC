import React from "react";

import {
  fetchBrands,
  fetchCategories,
  setFilterCategory,
  setFilterBrand,
  setFilterRange,
  fetchFilteredProducts
} from "../actions";
import ListButtons from "./ListButtons";

const range = [
  { id: 1, name: "<500", min_price: 0, max_price: 500 },
  { id: 2, name: "500-1000", min_price: 500, max_price: 1000 },
  { id: 3, name: "1000-2000", min_price: 1000, max_price: 2000 },
  { id: 4, name: "2000-5000", min_price: 2000, max_price: 5000 },
  { id: 5, name: "5000-10000", min_price: 5000, max_price: 10000 },
  { id: 6, name: ">20000", min_price: 10000, max_price: 20000 },
];

class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      brands: [],
      categories: [],
    };
  }
  componentDidMount() {
    const store = this.props.store;
    store.subscribe(() => {
      this.forceUpdate();
    });
    store.dispatch(fetchCategories());
  }

  handleClickRange = (id) => {
    const store = this.props.store;
    const minPrice = range[id - 1].min_price;
    const maxPrice = range[id - 1].max_price;
    store.dispatch(setFilterRange({ minPrice, maxPrice }));
    store.dispatch(fetchFilteredProducts());
  };

  handleClickCategory = (category) => {
    const { store } = this.props;
    store.dispatch(setFilterCategory(category));

    const { filterCategories } = store.getState().products;
    store.dispatch(fetchBrands(filterCategories));
    store.dispatch(fetchFilteredProducts());
  };

  handleClickBrand = (brand) => {
    const { store } = this.props;
    store.dispatch(setFilterBrand(brand));
    store.dispatch(fetchFilteredProducts());
  };

  render() {
    const { brands, categories, filterCategories, filterBrands, filterRange } =
      this.props.store.getState().products;
    console.log(filterCategories);
    console.log(filterBrands);
    console.log(filterRange);
    return (
      <div style={styles.container}>
        <div style={styles.heading}>
          <h1>Filters</h1>
        </div>
        <div style={styles.filterList}>
          <div style={styles.filter}>
            <h3>Range</h3>
            <div style={styles.listContainer}>
              {range.map((item) => (
                <ListButtons
                  key={item.id}
                  list={item}
                  handleClick={this.handleClickRange}
                  type="radio"
                  name="range"
                />
              ))}
            </div>
          </div>
        </div>
        <div style={styles.filterList}>
          <div style={styles.filter}>
            <h3>Categories</h3>
            <div style={styles.listContainer}>
              {categories.map((category) => (
                <ListButtons
                  key={category.id}
                  list={category}
                  handleClick={this.handleClickCategory}
                />
              ))}
            </div>
          </div>

          {brands.length > 0 && (
            <div style={styles.filter}>
              <h3>Brands</h3>
              <div style={styles.listContainer}>
                {brands.map((brand) => (
                  <ListButtons
                    key={brand.id}
                    list={brand}
                    handleClick={this.handleClickBrand}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

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
};

export default Filters;
