import { FETCH_DELETED_ITEM } from "./types";

export const fetchDeletedItem = item => dispatch => {
  dispatch({
    type: FETCH_DELETED_ITEM,
    payload: item
  });
};
