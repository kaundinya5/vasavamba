import { FETCH_STORE_ITEMS } from "./types";
const axios = require("axios");

export const fetchStoreItems = () => dispatch => {
  axios.get("http://localhost:4000/vasavamba/get_all").then(result => {
    delete result.data["_id"];
    delete result.data["__v"];

    dispatch({
      type: FETCH_STORE_ITEMS,
      payload: result.data
    });
  });
};
