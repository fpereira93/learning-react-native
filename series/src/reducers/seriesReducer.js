import series from '../../series_list.json';
import { SET_SERIES } from '../actions';

const INITIAL_STATE = null

const seriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SERIES:
            return action.series;
        default:
            return state;
    }
}

export default seriesReducer;