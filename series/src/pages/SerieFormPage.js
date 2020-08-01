import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import FormRow from '../components/FormRow';
import FormInput from '../components/FormInput';
import colors from '../constants/Colors';
import { setField, saveSerie, clearFields, editSerie } from '../actions/serieFormActions'
import FormPicker from '../components/FormPicker';
import FormSlider from '../components/FormSlider';
import FormButton from '../components/FormButton';
import Loading from '../components/Loading';

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
            rate: 0,
            loading: false,
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

    changeTitle(value){
        this.props.setField('title', value)
    }

    changeUrlImage(value){
        this.props.setField('img', value)
    }

    changeGender(value){
        this.props.setField('gender', value)
    }

    changeDescription(value){
        this.props.setField('description', value)
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

    onSave(){
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
                    <FormInput
                        maxLength={100}
                        value={serieForm.title}
                        onChange={this.changeTitle.bind(this)}
                        placeholder="Título" />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormInput
                        maxLength={100}
                        value={serieForm.img}
                        onChange={this.changeUrlImage.bind(this)}
                        placeholder="URL Imagem" />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormPicker
                        value={serieForm.gender}
                        itens={this.genders}
                        onChange={this.changeGender.bind(this)} />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormSlider
                        label="Avaliação"
                        value={serieForm.rate}
                        min={0} max={100} step={5}
                        onChange={this.onChangeDebounced.bind(this)} />
                </FormRow>

                <FormRow style={{ marginTop: 15 }}>
                    <FormInput
                        numberLines={5}
                        multiline
                        maxLength={600}
                        value={serieForm.description}
                        onChange={this.changeDescription.bind(this)}
                        placeholder="Descrição" />
                </FormRow>

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