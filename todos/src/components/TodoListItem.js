import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class TodoListItem extends React.Component {

    onPress(){
        this.props.onPress(this.props.todo);
    }

    onLongPress(){
        this.props.onLongPress(this.props.todo);
    }

    render(){
        return (
            <TouchableOpacity
                onLongPress={this.onLongPress.bind(this)}
                onPress={this.onPress.bind(this)}>

                <View style={style.line}>
                    <Text style={[style.text, this.props.todo.done ? style.done : null]}>
                        {this.props.todo.text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const style = StyleSheet.create({
    line: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        borderRadius: 2,
        padding: 5,
        marginTop: 5,
    },
    text: {
        fontSize: 20,
    },
    done: {
        textDecorationLine: 'line-through',
        color: 'green',
    }
})

export default TodoListItem;