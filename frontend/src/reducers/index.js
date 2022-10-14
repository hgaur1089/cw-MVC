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
  CLEAR_FILTERS,
  SET_PAGE_NO,
} from "../actions/types";

const filters = (state = {
  filterCategories: [],
  filterBrands: [],
  filterRange: [],
  filteredProducts: [],
  pageno: 0,
}, action) => {
  switch (action.type) {
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
        filterBrands.splice(ind, 1);
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
    case CLEAR_FILTERS:
      return {
        ...state,
        filterCategories: [],
        filterBrands: [],
        filterRange: [],
        filteredProducts: [],
      };
    default:
      return state;
  }
};

const products = (state = {
  list: [],
  brands: [],
  categories: [],
  loading: false,
  pageno: 0,
}, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        loading: false,
        list: action.products,
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
    case SET_PAGE_NO:
      return {
        ...state,
        pageno: action.pageno,
      };
    default:
      return state;
  }
};

export default combineReducers({
  products,
  filters,
});


// const initialProductsState = {
//   list: [],
//   brands: [],
//   categories: [],
//   filterCategories: [],
//   filterBrands: [],
//   filterRange: [],
//   filteredProducts: [],
//   loading: false,
//   pageno: 0,
// };
// export function products(state = initialProductsState, action) {
//   switch (action.type) {
//     case SET_LOADING:
//       return {
//         ...state,
//         loading: !state.loading,
//       };
//     case ADD_PRODUCTS:
//       return {
//         ...state,
//         loading: false,
//         list: action.products,
//       };
//     case ADD_BRANDS:
//       return {
//         ...state,
//         brands: action.brands,
//       };
//     case ADD_CATEGORIES:
//       return {
//         ...state,
//         categories: action.categories,
//       };
//     case SET_FILTER_CATEGORY:
//       const { filterCategories } = state;
//       const index = filterCategories.indexOf(action.category);
//       if (index > -1) {
//         filterCategories.splice(index, 1);
//       } else {
//         filterCategories.push(action.category);
//       }
//       return {
//         ...state,
//         filterCategories,
//       };
//     case SET_FILTER_BRAND:
//       const { filterBrands } = state;
//       const ind = filterBrands.indexOf(action.brand);
//       if (ind > -1) {
//         filterBrands.splice(index, 1);
//       } else {
//         filterBrands.push(action.brand);
//       }
//       return {
//         ...state,
//         filterBrands,
//       };
//     case SET_FILTER_RANGE:
//       return {
//         ...state,
//         filterRange: action.range,
//       };
//     case SET_FILTERED_PRODUCTS:
//       return {
//         ...state,
//         filteredProducts: action.products,
//       };
//     case CLEAR_FILTERS:
//       return {
//         ...state,
//         filterCategories: [],
//         filterBrands: [],
//         filterRange: [],
//         filteredProducts: [],
//       };
//     case SET_PAGE_NO:
//       return {
//         ...state,
//         pageno: action.pageno,
//       };
//     default:
//       return state;
//   }
// }