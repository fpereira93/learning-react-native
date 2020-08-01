import service from '../services/firebase';

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => ({
    type: SET_FIELD,
    field,
    value,
})

export const CLEAR_FIELDS = 'CLEAR_FIELDS';
export const clearFields = () => ({
    type: CLEAR_FIELDS,
})

export const EDIT_SERIE = 'EDIT_SERIE';
export const editSerie = serie => ({
    type: EDIT_SERIE,
    serie
})

export const saveSerie = serie => {
    return (dispatch) => {
        const seriesDb = service.seriesDb(serie.id)

        if (serie.id){
            return seriesDb.update(serie)
        }

        return seriesDb.push(serie)
    }
 }

export const deleteSerie = serie => {
    return (dispatch) => {
        const seriesDb = service.seriesDb(serie.id)

        return seriesDb.remove()
    }
}