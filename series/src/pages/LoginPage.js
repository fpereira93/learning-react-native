import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormRow from '../components/FormRow';
import FormButton from '../components/FormButton';
import FormNotInline from '../components/FormNotInline';
import Loading from '../components/Loading';
import BaseNotLoggedPage from '../pages/BaseNotLoggedPage';
import services from '../services/firebase';
import { connect } from 'react-redux';

import { tryLogin } from '../actions';

class LoginPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            msgTryLogin: '',
            loading: false,
        }
    }

    changeEmail(email){
        this.setState({ email })
    }

    changePassword(password){
        this.setState({ password })
    }

    hideMessage(){
        setTimeout(() => this.setState({ msgTryLogin: '' }), 2000)
    }

    validateInputs(){
        const {email, password} = this.state;

        if (!email || !password){
            this.setState({ msgTryLogin: 'e-mail e senha são campos obrigatórios' })

            this.hideMessage()

            return false;
        }

        return true;
    }

    alertUserNotFound() {
        Alert.alert(
            'Usuário não encontrado',
            'Deseja criar um usuário para você?',
            [
                {
                    text: 'Não',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: () => this.props.navigation.navigate('register', { email: this.state.email }),
                }
            ],
            {
                cancelable: false
            }
        )
    }

    tryLoggin(){
        if (!this.validateInputs()){
            return;
        }

        this.setState({ loading: true })

        const {email, password} = this.state;

        this.props.tryLogin({email, password}).then((user) => {
            this.props.navigation.replace('series-list')
        }).catch((error) => {

            if (error.code === 'auth/user-not-found'){
                this.alertUserNotFound()
            } else {
                this.setState({
                    loading: false,
                    msgTryLogin: services.authErrorMessage(error.code),
                })
    
                this.hideMessage()
            }
        }).finally(() => {
            this.setState({ loading: false })
        })
    }

    toRegister(){
        this.props.navigation.navigate('register')
    }

    render(){
        return (
            <BaseNotLoggedPage>
                <Loading show={this.state.loading} />

                <View style={style.inputsContainer}>
                    <FormRow>
                        <FormInput onChange={this.changeEmail.bind(this)} isEmail placeholder="email" />
                    </FormRow>
                    <FormRow>
                        <FormInput onChange={this.changePassword.bind(this)} isPassword placeholder="senha" />
                    </FormRow>
                    <FormRow>
                        <FormButton title='ENTRAR' onPress={this.tryLoggin.bind(this)}/>
                    </FormRow>

                    <FormNotInline type='error' message={this.state.msgTryLogin} />

                    <Text onPress={this.toRegister.bind(this)} style={style.linkRegister}>clique aqui para se registrar</Text>
                </View>
            </BaseNotLoggedPage>
        )
    }
}

const style = StyleSheet.create({
    inputsContainer: {
        flex: 1,
    },
    linkRegister: {
        textAlign: 'right',
        color: '#61dafb',
        padding: 5,
        textDecorationLine: 'underline'
    }
})

export default connect(null, { tryLogin })(LoginPage);