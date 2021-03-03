import { ADD_FLIGHT_CARDS, REMOVE_ALL_ITEMS } from '../utils/constants';

const initialState = {
  cardsData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLIGHT_CARDS: {
      return  { ...state, cardsData: action.payload }
    }
    case REMOVE_ALL_ITEMS: {
      return  { ...state, cardsData: [] }
    }
    default: {
      return state;
    }
  }
}

export default reducer;
