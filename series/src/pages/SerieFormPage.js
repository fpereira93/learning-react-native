import React from 'react';
import { StyleSheet, ScrollView, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';

import FormRow from '../components/FormRow';
import FormInput from '../components/FormInput';
import colors from '../constants/Colors';
import { setField, saveSerie, clearFields, editSerie } from '../actions/serieFormActions'
import FormPicker from '../components/FormPicker';
import FormSlider from '../components/FormSlider';
import FormButton from '../components/FormButton';
import Loading from '../components/Loading';
import FormNotInline from '../components/FormNotInline';
import SerieImage from '../components/SerieImage';

class SerieFormPage extends React.Component {

    constructor(props){
        super(props)

        this.genders = [
            { label: 'Selecionar', value: null },
            { label: 'Ficção Científica', value: 'science_fiction' },
            { label: 'Comédia', value: 'comedy' },
            { label: 'Drama', value: 'drama' },
            { label: 'Ação', value: 'action' },
        ]

        this.state = {
            loading: false,
            message: ''
        }

        this.onChangeDebounced = _.debounce(this.changeRate, 1000)
    }

    componentDidMount(){
        if (this.props.route.params){
            const { serieToEdit } = this.props.route.params

            this.props.editSerie(serieToEdit)
        } else {
            this.props.clearFields()
        }
    }

    changeRate(value){
        this.props.setField('rate', value)
    }

    alert(title, message, onPressOkay){
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'OK',
                    onPress: onPressOkay || function(){},
                }
            ],
            {
                cancelable: false
            }
        )
    }

    isValidFields(){
        const { serieForm } = this.props;

        const isValid = (
            serieForm.title.trim() != "" &&
            (serieForm.img.trim() != "" || serieForm.img64.trim() != "") &&
            serieForm.gender != null &&
            serieForm.description.trim() != ""
        )

        return isValid;
    }

    setRequiredFields(){
        this.setState({ ...this.state, message: 'Todos os campos são obrigatórios' })

        setTimeout(() => {
            this.setState({ ...this.state, message: '' })
        }, 2000)
    }

    async pickImage(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted'){
            Alert.alert('Você precisa permitir o acesso ao app!');
            return false;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.2,
            allowsEditing: true,
            base64: true
        });

        if (!result.cancelled){
            this.props.setField('img64', result.base64)
            this.props.setField('img', '')
        }
    }

    async photoImage(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        if (status !== 'granted'){
            Alert.alert('Você precisa permitir o acesso ao app!');
            return false;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.2,
            allowsEditing: true,
            base64: true
        });

        if (!result.cancelled){
            this.props.setField('img64', result.base64)
            this.props.setField('img', '')
        }
    }

    onSave(){
        if (!this.isValidFields()){
            this.setRequiredFields();
            return;
        }

        this.setState({ ...this.state, loading: true })

        const { serieForm } = this.props;

        this.props.saveSerie(serieForm).then(() => {

            const message = serieForm.id
                ? 'Série Atualizada com sucesso!'
                : 'Série Inserida com sucesso!';

            this.alert('Sucesso', message, () => {
                this.props.navigation.goBack()
            })
        }).catch((e) => {
            this.alert('Erro', 'Erro ao inserir a nova série!')
        }).finally(() => {
            this.setState({ ...this.state, loading: false })
        })
    }

    render(){
        const { serieForm } = this.props

        return (
            <ScrollView style={styles.container}>
                <Loading show={this.state.loading} />

                <FormRow style={{ marginTop: 15 }}>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <FormButton
                            styleButton={{flex: 1, marginRight: 1}}
                            title="Selecionar imagem"
                            onPress={this.pickImage.bind(this)}/>

                        <FormButton
                            styleButton={{flex: 1, marginLeft: 1}}
                            title="Tirar foto"
                            onPress={this.photoImage.bind(this)}/>
                    </View>

                    <SerieImage {...serieForm} style={{ flex: 1 }} />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormInput
                        maxLength={100}
                        value={serieForm.title}
                        onChange={(value) => this.props.setField('title', value)}
                        placeholder="Título" />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormPicker
                        value={serieForm.gender}
                        itens={this.genders}
                        onChange={(value) => this.props.setField('gender', value)} />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormSlider
                        label="Avaliação"
                        value={serieForm.rate}
                        min={0} max={100} step={5}
                        onChange={this.changeRate.bind(this)} />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormInput
                        numberLines={5}
                        multiline
                        maxLength={600}
                        value={serieForm.description}
                        onChange={(value) => this.props.setField('description', value)}
                        placeholder="Descrição" />
                </FormRow>

                <FormNotInline type='warning' message={this.state.message} />

                <FormRow style={{ marginTop: 15, marginBottom: 10 }}>
                    <FormButton title="Salvar" onPress={this.onSave.bind(this)}/>
                </FormRow>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.default,
        flex: 1,
    }
})

const mapStateToProps = ({ serieForm }) => ({
    serieForm,
})

const dispatchToProps = {
    setField,
    saveSerie,
    clearFields,
    editSerie
}

export default connect(mapStateToProps, dispatchToProps)(SerieFormPage);