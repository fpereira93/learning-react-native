import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FormInput from '../components/FormInput';
import FormRow from '../components/FormRow';
import FormButton from '../components/FormButton';
import FormNotInline from '../components/FormNotInline';
import Loading from '../components/Loading';
import firebase from '../services/firebase';
import BaseNotLoggedPage from '../pages/BaseNotLoggedPage';

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
        setTimeout(() => this.setState({ msgTryLogin: '' }), 3000)
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

    tryLoggin(){
        if (!this.validateInputs()){
            return;
        }

        this.setState({ loading: true })

        const {email, password} = this.state;

        try {
            firebase
            .auth(email, password)
            .then(user => {
                this.setState({ loading: false })

                console.log(user);

                alert('Login success')
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    msgTryLogin: firebase.authErrorMessage(error.code),
                })

                this.hideMessage()
            })
        } catch (error) {
            this.setState({
                loading: false,
                msgTryLogin: 'Erro ao executar serviço, tente novamente'
            })

            this.hideMessage()
        }
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
                        <FormInput onChange={this.changeEmail.bind(this)} placeholder="email" />
                    </FormRow>
                    <FormRow>
                        <FormInput onChange={this.changePassword.bind(this)} password placeholder="senha" />
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

export default LoginPage;