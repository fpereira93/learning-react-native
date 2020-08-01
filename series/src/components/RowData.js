import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    LayoutAnimation,
    NativeModules,
} from 'react-native';

import colors from '../constants/Colors';

NativeModules.UIManager.setLayoutAnimationEnabledExperimental && NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);

class RowData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }
    }

    componentDidUpdate(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }

    toogleExpanded(){
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    getStyleContainer(){
        return [
            this.props.isLongText ? styleLongText.container : style.container,
            this.props.style
        ]
    }

    getStyleLabel(){
        return [
            style.cell,
            this.props.isLongText ? styleLongText.cellLabel : style.cellLabel,
            this.props.styleLabel
        ]
    }

    getStyleValue(){
        return [
            style.cell,
            this.props.isLongText ? styleLongText.cellValue : style.cellValue,
            this.props.isLongText && !this.state.isExpanded ? styleLongText.collapsed : null,
            this.props.styleValue,
        ]
    }

    getRenderFieldValue(){
        if (this.props.isLongText){
            return (
                <TouchableWithoutFeedback onPress={this.toogleExpanded.bind(this)}>
                    <View>
                        <Text style={this.getStyleValue()}>
                            {this.props.value}
                        </Text>
                        <Text style={styleLongText.textReadMore}>
                            { this.state.isExpanded ? 'Mostrar menos' : 'Mostrar mais' }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <Text style={this.getStyleValue()}>
                {this.props.value}
            </Text>
        )
    }

    render(){
        return (
            <View style={this.getStyleContainer()}>

                <Text style={this.getStyleLabel()}>
                    {this.props.label}
                </Text>

                { this.getRenderFieldValue() }

            </View>
        )
    }
}

const styleLongText = StyleSheet.create({
    container: {
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10,
    },
    cellLabel: {
        fontWeight: 'bold',
        flex: 1,
        marginBottom: 5,
    },
    cellValue: {
        flex: 3,
        borderLeftColor: colors.gray,
        borderLeftWidth: 0.7,
        textAlign: "justify"
    },
    collapsed: {
        maxHeight: 45,
    },
    textReadMore: {
        color: '#76BAE9',
        fontSize: 18,
        marginTop: 5,
        textAlign: 'center',
    }
})

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    cell: {
        fontSize: 15,
    },
    cellLabel: {
        fontWeight: 'bold',
        flex: 1,
    },
    cellValue: {
        flex: 3,
        borderLeftColor: colors.gray,
        borderLeftWidth: 0.7,
        paddingLeft: 10,
    },
})

export default RowData;