import axios from "axios";
import store from "../index";
import qs from "qs";

import {
  SET_FILTER_CATEGORY,
  SET_FILTER_BRAND,
  SET_FILTER_RANGE,
  SET_FILTERED_PRODUCTS,
  CLEAR_FILTERS,
  SET_PAGE_NO,
  SET_LOADING,
  ADD_PRODUCTS,
  ADD_BRANDS,
  ADD_CATEGORIES
} from "../actions/types";

export function fetchProducts(pageno = 0) {
  return (dispatch) => {
    dispatch(setLoading());
    axios
      .get(`https://localhost:7028/?page=${pageno}`)
      .then((res) => {
        dispatch(addProducts(res.data.products));
        dispatch(addCategories(res.data.categories));
        dispatch(setPageNo(pageno));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchFilteredProducts(pageno) {
  const url = "https://localhost:7028/products/search";
  const categories = store.getState().filters.filterCategories;
  const brands = store.getState().filters.filterBrands;
  const minPrice = store.getState().filters.filterRange.minPrice;
  const maxPrice = store.getState().filters.filterRange.maxPrice;
  const limit = pageno ? pageno : 0;
  const params = {
    categories,
    brands,
    minPrice,
    maxPrice,
    limit,
  };
  console.log(params);
  return function (dispatch) {
    dispatch(setLoading());
    return axios
      .get(url, {
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .then((response) => {
        console.log("response = ", response);
        dispatch(setLoading(false));
        dispatch(addFilteredProducts(response.data));
        dispatch(setPageNo(limit === 0 ? 0 : pageno));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function fetchBrands(categories) {
  const url = "https://localhost:7028/getbrands";
  const brands = [];
  return function (dispatch) {
    return axios
      .get(url)
      .then((response) => {
        response.data.map((brand) => {
          if (categories.includes(brand.category)) brands.push(brand);
        });
        dispatch(addBrands(brands));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function fetchCategories() {
  const url = "https://localhost:7028/getcategories";
  return function (dispatch) {
    return axios
      .get(url)
      .then((response) => {
        dispatch(addCategories(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  };
}

export function addBrands(brands) {
  return {
    type: ADD_BRANDS,
    brands,
  };
}

export function addFilteredProducts(products) {
  return {
    type: SET_FILTERED_PRODUCTS,
    products,
  };
}

export function setFilterRange(range) {
  return {
    type: SET_FILTER_RANGE,
    range,
  };
}

export function setFilterCategory(category) {
  return {
    type: SET_FILTER_CATEGORY,
    category,
  };
}

export function setFilterBrand(brand) {
  return {
    type: SET_FILTER_BRAND,
    brand,
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}

export const setPageNo = (pageno) => {
  return {
    type: SET_PAGE_NO,
    pageno,
  };
};

export function setLoading() {
  return {
    type: SET_LOADING,
  };
}