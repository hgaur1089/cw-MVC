import axios from "axios";
import store from "../index";
import qs from "qs";
export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const SET_LOADING = "SET_LOADING";
export const ADD_BRANDS = "ADD_BRANDS";
export const ADD_CATEGORIES = "ADD_CATEGORIES";
export const SET_FILTER_CATEGORY = "SET_FILTER_CATEGORY";
export const SET_FILTER_BRAND = "SET_FILTER_BRAND";
export const SET_FILTER_RANGE = "SET_FILTER_RANGE";
export const SET_FILTERED_PRODUCTS = "SET_FILTERED_PRODUCTS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_PAGE_NO = "SET_PAGE_NO";

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const setPageNo = (pageno) => {
  return {
    type: SET_PAGE_NO,
    pageno,
  };
}

export function fetchProducts(pageno) {
  pageno = pageno ? pageno : 0;
  const url = `https://localhost:7028/?page=${pageno}`;
  return function (dispatch) {
    dispatch(setLoading());
    return axios
      .get(url)
      .then((response) => {
        dispatch(setLoading());
        dispatch(addProducts(response.data));
        dispatch(setPageNo(pageno===undefined?1:pageno));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function fetchFilteredProducts(pageno) {
  const url = "https://localhost:7028/products/search";
  const categories = store.getState().products.filterCategories;
  const brands = store.getState().products.filterBrands;
  const minPrice = store.getState().products.filterRange.minPrice;
  const maxPrice = store.getState().products.filterRange.maxPrice;
  const limit = pageno ? pageno : 0;
  const params = {
    categories,
    brands,
    minPrice,
    maxPrice,
    limit,
  };
  console.log("params = ", params);
  return function (dispatch) {
    dispatch(setLoading());
    return axios
      .get(url, { params, paramsSerializer: params => {
        return qs.stringify(params)
      } })
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(addFilteredProducts(response.data));
        dispatch(setPageNo(limit==0?0:pageno));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addFilteredProducts(products) {
  return {
    type: SET_FILTERED_PRODUCTS,
    products,
  };
}

export function addBrands(brands) {
  return {
    type: ADD_BRANDS,
    brands,
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

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
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

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
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

export function setFilterRange(range) {
  return {
    type: SET_FILTER_RANGE,
    range,
  };
}