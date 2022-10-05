import { combineReducers } from "redux";
import {
  ADD_PRODUCTS,
  ADD_BRANDS,
  ADD_CATEGORIES,
  SET_LOADING,
  SET_FILTER_CATEGORY,
  SET_FILTER_BRAND,
  SET_FILTER_RANGE,
  SET_FILTERED_PRODUCTS,
} from "../actions";

const initialProductsState = {
  list: [],
  brands: [],
  categories: [],
  filterCategories: [],
  filterBrands: [],
  filterRange: [],
  filteredProducts: [],
  loading: false,
};
export function products(state = initialProductsState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        loading: false,
        list: [...state.list, ...action.products],
      };
    case ADD_BRANDS:
      return {
        ...state,
        brands: action.brands,
      };
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_FILTER_CATEGORY:
      const { filterCategories } = state;
      const index = filterCategories.indexOf(action.category);
      if (index > -1) {
        filterCategories.splice(index, 1);
      } else {
        filterCategories.push(action.category);
      }
      return {
        ...state,
        filterCategories,
      };
    case SET_FILTER_BRAND:
      const { filterBrands } = state;
      const ind = filterBrands.indexOf(action.brand);
      if (ind > -1) {
        filterBrands.splice(index, 1);
      } else {
        filterBrands.push(action.brand);
      }
      return {
        ...state,
        filterBrands,
      };
    case SET_FILTER_RANGE:
      return {
        ...state,
        filterRange: action.range,
      };
    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.products,
      };
    default:
      return state;
  }
}

export default combineReducers({
  products,
});
