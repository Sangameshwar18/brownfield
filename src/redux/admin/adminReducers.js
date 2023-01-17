import { GET_ALL_FLIGHTS } from "./adminTypes";
import { ADD_FLIGHT } from "./adminTypes";

import { GET_ALL_BOOKINGS } from "./adminTypes";

const initialState = {
    flights: {},
    bookings: {}
}

export const adminReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FLIGHTS: return {
            ...state,
            flights: action.payload
        };

        case ADD_FLIGHT: return action.payload;

        case GET_ALL_BOOKINGS: return {
            ...state,
            bookings: action.payload
        };

        default: return state;
    }
}
