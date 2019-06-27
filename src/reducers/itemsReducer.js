import { FETCH_CLICKED_ITEM } from "../actions/types";
const initialState = {
  itemName: NaN,
  itemWeight: NaN,
  itemQuantity: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLICKED_ITEM:
      return {
        ...state,
        itemName: action.payload
      };
    default:
      return state;
  }
}
