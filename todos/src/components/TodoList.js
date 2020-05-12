import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import TodoListItem from './TodoListItem';

import { makeDoneTodo, setEditingTodo } from '../actions/index'

class TodoList extends React.Component {

    constructor(props){
        super(props)
    }

    onPress(todo){
        this.props.dispatchMakeDoneTodo(todo.id);
    }

    onLongPress(todo){
        this.props.dispatchEditingTodo(todo);
    }

    renderTodos(){
        return this.props.todos.map((todo) => {
            return (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onPress={this.onPress.bind(this)}
                    onLongPress={this.onLongPress.bind(this)} />
            )
        })
    }

    render(){
        return (
            <ScrollView style={style.container}>
                { this.renderTodos() }
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    todoItem: {
        display: 'flex',
    }
})

const mapStateToProps = state => {
    const todos = state.todos;
    return { todos };
}

const dispatchToProps = {
    dispatchMakeDoneTodo: makeDoneTodo,
    dispatchEditingTodo: setEditingTodo
};

export default connect(mapStateToProps, dispatchToProps)(TodoList);