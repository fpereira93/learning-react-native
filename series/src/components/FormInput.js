import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

class FormInput extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            focused: false,
        }
    }

    onFocus(){
        this.setState({ focused: true })
    }

    onBlur(){
        this.setState({ focused: false })
    }

    onChangeText(text){
        this.props.onChange && this.props.onChange(text)
        this.setState({ value: text })
    }

    render(){
        return (
            <View style={[style.container, this.state.focused ? style.focused : null]}>
                <TextInput
                    value={this.props.value}
                    onChangeText={text => this.onChangeText(text)}
                    autoCompleteType="off"
                    placeholder={!this.state.focused ? this.props.placeholder : null}
                    onFocus={() => this.onFocus.bind(this)}
                    onBlur={() => this.onBlur.bind(this)}
                    secureTextEntry={this.props.isPassword}
                    style={style.input}
                    placeholderTextColor='rgba(255,255,255, 0.5)'
                    selectionColor={'white'}
                    numberOfLines={this.props.numberLines}
                    multiline={this.props.multiline}
                    maxLength={this.props.maxLength}
                    keyboardType={this.props.isEmail ? 'email-address' : 'default'}
                />
            </View>
        )
    }

}

const style = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        backgroundColor: colors.transparent,
        borderRadius: 2.5,
    },
    focused: {
        borderLeftColor: 'white',
    },
    input: {
        fontSize: 15,
        color: 'white',
    },
})

export default FormInput;