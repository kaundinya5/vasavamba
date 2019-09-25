import { FETCH_CLICKED_ITEM } from "./types";

export const fetchClickedItem = item => dispatch => {
  dispatch({
    type: FETCH_CLICKED_ITEM,
    payload: item
  });
};
