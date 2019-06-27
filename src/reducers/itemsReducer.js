import { FETCH_CLICKED_ITEM } from "../actions/types";
const initialState = {
  clickedItem: NaN,
  itemWeight: NaN
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLICKED_ITEM:
      return {
        ...state,
        clickedItem: action.payload
      };
    default:
      return state;
  }
}
