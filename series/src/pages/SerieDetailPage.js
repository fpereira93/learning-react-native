import React from 'react';
import { StyleSheet, Image, ScrollView, Alert } from 'react-native';
import RowData from '../components/RowData';
import FormButton from '../components/FormButton';
import colors from '../constants/Colors';
import { connect } from 'react-redux';
import { deleteSerie } from '../actions';
import Loading from '../components/Loading';
import SerieImage from '../components/SerieImage';

class SerieDetailPage extends React.Component {

    constructor(props){
        super(props)

        this.genders = {
            science_fiction: 'Ficção Científica',
            comedy: 'Comédia',
            drama: 'Drama',
            action: 'Ação',
        }

        this.state = {
            loading: false
        }
    }

    getGenderDescription(key){
        if (this.genders[key]){
            return this.genders[key]
        }

        return 'Não informado';
    }

    onPressEdit(serie){
        this.props.navigation.replace('serie-form', { serieToEdit: serie })
    }

    confirmMessage(onPressYes){
        Alert.alert(
            'Confirmação',
            'Deseja realmente deletar a Série?',
            [
                {
                    text: 'Não',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: onPressYes
                }
            ],
            {
                cancelable: false
            }
        )
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

    onPressDelete(){

        this.confirmMessage(() => {
            this.setState({ loading: true })

            const { serie } = this.props.route.params;

            this.props.deleteSerie(serie).then(() => {

                this.alert('Sucesso', 'Série deletada com sucesso!', () => {
                    this.props.navigation.replace('series-list')
                })

            }).catch((e) => {
                this.alert('Erro', 'Erro ao tentar deletar a série!')
            }).finally(() => {
                this.setState({ loading: false })
            })
        })

    }

    render() {
        const { serie } = this.props.route.params;

        return (
            <ScrollView style={styles.container}>

                <Loading show={this.state.loading} />

                <SerieImage {...serie} style={{ flex: 1 }} />

                <RowData label='Título' value={serie.title} />

                <RowData label='Gênero' value={this.getGenderDescription(serie.gender)} />

                <RowData label='Avaliação' value={serie.rate} />

                <RowData label='Descrição' value={serie.description} isLongText={true} />

                <FormButton
                    styleButton={styles.button}
                    styleText={styles.buttonText}
                    title="Editar"
                    onPress={ this.onPressEdit.bind(this, serie) } />

                <FormButton
                    styleButton={styles.button}
                    styleText={styles.buttonText}
                    title="Deletar"
                    onPress={ this.onPressDelete.bind(this, serie) } />

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    image: {
        aspectRatio: 1
    },
    button: {
        backgroundColor: colors.default,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
    }
})

const dispatchToProps = {
    deleteSerie,
}

export default connect(null, dispatchToProps)(SerieDetailPage);