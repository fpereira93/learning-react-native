import { ADD_TODO, TOGGLE_TODO, UPDATE_TODO } from "../actions";

let currentId = 0;

const getNextId = () => (
    ++currentId
)

const todoListReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { id: getNextId(), text: action.text, done: false }]
        case TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id == action.id){
                    return { ...todo, done: !todo.done }
                }

                return todo;
            })
        case UPDATE_TODO:
            return state.map((todo) => {
                if (todo.id == action.todo.id){
                    return action.todo;
                }

                return todo;
            })
        default:
            return [...state]
    }

}

export default todoListReducer;