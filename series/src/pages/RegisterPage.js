import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
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
            confirmPassword: '',
            msgTryRegister: '',
            notInlineType: 'error',
            loading: false
        }
    }

    changeEmail(email){
        this.setState({ email })
    }

    changePassword(password){
        this.setState({ password })
    }

    changeConfirmPassword(confirmPassword){
        this.setState({ confirmPassword })
    }

    hideMessage(){
        setTimeout(() => this.setState({ msgTryRegister: '' }), 3000);
    }

    validateInputs()
    {
        const {email, password, confirmPassword} = this.state;

        if (!email || !password || !confirmPassword){
            this.setState({ msgTryRegister: 'e-mail, senha e confirmar senha são campos obrigatórios' })

            this.hideMessage()

            return false;
        }

        if (password != confirmPassword){
            this.setState({
                notInlineType: 'error',
                msgTryRegister: 'Senha de confirmação está diferente'
            })

            this.hideMessage()

            return false;
        }

        return true;
    }

    showAlertSuccess(){
        Alert.alert(
            'Conta criada com sucesso!',
            'Ao clicar em \'OK\', você será redirecionado para tela de Login',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.navigation.navigate('login', { email: 'sasdasd', password: 'asdasd' })
                    }
                },
            ],
            {
                cancelable: false
            },
        );
    }

    tryRegister(){
        if (!this.validateInputs()){
            return;
        }

        this.setState({ loading: true })

        const {email, password} = this.state;

        try {
            firebase
            .register(email, password)
            .then(user => {
                this.showAlertSuccess()
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    notInlineType: 'warning',
                    msgTryRegister: firebase.registerErrorMessage(error.code)
                })

                this.hideMessage()
            })
        } catch (error) {
            this.setState({
                loading: false,
                notInlineType: 'error',
                msgTryRegister: 'Erro ao executar serviço, tente novamente'
            })

            this.hideMessage()
        }
    }

    toLogin(){
        this.props.navigation.navigate('login')
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
                        <FormInput onChange={this.changeConfirmPassword.bind(this)} password placeholder="confirmar senha" />
                    </FormRow>
                    <FormRow>
                        <FormButton title='CADASTRAR' onPress={this.tryRegister.bind(this)}/>
                    </FormRow>

                    <FormNotInline type={this.state.notInlineType} message={this.state.msgTryRegister} />

                    <Text onPress={this.toLogin.bind(this)} style={style.linkLogin}>clique aqui para fazer login</Text>
                </View>
            </BaseNotLoggedPage>
        )
    }
}

const style = StyleSheet.create({
    inputsContainer: {
        flex: 1,
    },
    linkLogin: {
        textAlign: 'right',
        color: '#61dafb',
        padding: 5,
        textDecorationLine: 'underline'
    }
})

export default LoginPage;