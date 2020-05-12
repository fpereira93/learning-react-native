import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import { connect } from 'react-redux';
import { addTodo, setTodoText, updateTodo } from '../actions';

class TodoForm extends React.Component {

    onChangeText(text){
        this.props.dispatchSetTodoText(text);
    }

    onPressButton(){
        if (!this.props.editingTodo.id){
            this.props.dispatchAddTodo(this.props.editingTodo.text);
        } else {
            this.props.dispatchUpdateTodo(this.props.editingTodo);
        }
    }

    render(){
        return (
            <View style={style.container}>
                <TextInput
                    maxLength={25}
                    style={style.inputText}
                    onChangeText={text => this.onChangeText(text)}
                    value={this.props.editingTodo.text}
                />

                <View style={style.button}>
                    <Button
                        onPress={() => this.onPressButton()}
                        color="#20232A"
                        title={!this.props.editingTodo.id ? 'ADD' : 'UPDATE'}/>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    inputText: {
        flex: 2,
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#20232A',
        borderRadius: 2,
        color: '#20232A',
    },
    button: {
        flex: 1,
        paddingLeft: 5,
        color: '#55B7D3',
    }
})

const mapStateToProps = state => {
    const editingTodo = state.editingTodo;
    return { editingTodo };
}

const dispatchToProps = {
    dispatchAddTodo: addTodo,
    dispatchSetTodoText: setTodoText,
    dispatchUpdateTodo: updateTodo,
};

export default connect(mapStateToProps, dispatchToProps)(TodoForm);