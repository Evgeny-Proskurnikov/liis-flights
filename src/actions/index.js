import { ADD_FLIGHT_CARDS, REMOVE_ALL_ITEMS } from "../utils/constants"

export const addFlightCards = (data) => {
  return { type: ADD_FLIGHT_CARDS, payload: data }
};

export const removeItems = () => {
  return { type: REMOVE_ALL_ITEMS }
};
