export const BASE_URL = "http://45.119.83.107:9002/api";
// Product
export const GET_PRODUCT_ENDPOINT = `${BASE_URL}/Auth/token`;
//
export const CHECK_LOGIN_ENDPOINT = `${BASE_URL}/Auth`;
export const GET_TOKEN_ENDPOINT = `${BASE_URL}/Auth/token`;
export const CREATE_ACCOUNT_ID = `${BASE_URL}/Auth/Register`;
export const GET_PRODUCT = `${BASE_URL}/Product`;
export const LIKE_PRODUCT = `${BASE_URL}/Product/`;

//ORDER
export const GET_ORDER = `${BASE_URL}/Order/All?index=1&pageSize=30`; //1&pageSize=5
export const GET_ORDER_TYPE = `${BASE_URL}/Order/All?index=1&pageSize=30&type=`; //1&pageSize=5
export const GET_ORDER_NOT_CONFIRMED = `${BASE_URL}/Order/All?IsConfirmed=false&index=1&pageSize=25`; //1&pageSize=5
export const GET_ORDER_CONFIRMED = `${BASE_URL}/Order/All?IsConfirmed=true&index=1&pageSize=25`; //&1&pageSize=5
export const GET_CART = `${BASE_URL}/Cart`;
export const POST_CART = `${BASE_URL}/Cart`;
export const UPDATE_CART = `${BASE_URL}/Cart`;
export const ORDER_CART = `${BASE_URL}/Cart/Order`;
export const DELETE_CART = `${BASE_URL}/Cart/`;
export const GET_ORDER_DETAIL = `${BASE_URL}/Order/`;
export const SUBMIT_ORDER = `${BASE_URL}/Order/Confirm/`;
export const DONE_ORDER = `${BASE_URL}/Order/Done/`;
export const REFUSE_ORDER = `${BASE_URL}/Order/Refuse/`;
export const PRODUCT_AVATA = `${BASE_URL}/Product/Images`;
export const UPDATE_ACCOUNT = `${BASE_URL}/Account`;
export const CREATE_PRODUCT_ENDPOINT = `${BASE_URL}/Product`;
export const GET_PRODUCT_ID = `${BASE_URL}/Product/`;
export const GET_PRODUCT_TAB_ID = `${BASE_URL}/Category/`;
export const UPDATE_PRODUCT = `${BASE_URL}/Product/`;
