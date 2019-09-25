import { CLEAR_ALL_ITEMS } from "./types";

export const clearAllItems = () => dispatch => {
  dispatch({
    type: CLEAR_ALL_ITEMS
  });
};
