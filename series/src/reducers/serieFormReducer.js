import {  SET_FIELD, CLEAR_FIELDS, EDIT_SERIE } from '../actions';

const INITIAL_STATE = {
    'id': null,
    'title': '',
    'gender': '',
    'rate': 0,
    'img': '',
    'description': ''
}

const serieFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FIELD:
            return { ...state, [action.field]: action.value }
        case EDIT_SERIE:
            return { ...action.serie }
        case CLEAR_FIELDS:
            return { ...INITIAL_STATE }
        default:
            return state;
    }
}

export default serieFormReducer;