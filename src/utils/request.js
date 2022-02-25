import axios from "axios"
import { BOOK_STORE_URL } from "../config.js"
import { setOperatePage } from '../actions/router.js'
import store from "../store"

const bookStoreResquest = axios.create({
  baseURL: BOOK_STORE_URL,
  headers: { 'Content-Type': 'application/json' },
})

bookStoreResquest.interceptors.request.use(function (config) {
  const state = store.getState().userReducer
  const token = state.userToken
  // Do something before request is sent
  config.headers.token = token
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


bookStoreResquest.interceptors.response.use(function (response) {
  if(response.data.status !== "success") {
    if(response.data.code===400){
      store.dispatch(setOperatePage("login"))
    }
    alert(response.data.status)
    throw Error("資料有誤")
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});




export default bookStoreResquest