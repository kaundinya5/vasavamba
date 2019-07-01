import { FETCH_CLICKED_ITEM } from "../actions/types";
import { FETCH_DELETED_ITEM } from "../actions/types";
const initialState = {
  selectedItems: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLICKED_ITEM:
      return {
        selectedItems: [
          ...state.selectedItems,
          { itemName: action.payload, itemWeight: 0, itemQuantity: 0 }
        ]
      };
    case FETCH_DELETED_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          element => element !== action.payload
        )
      };
    default:
      return state;
  }
}
