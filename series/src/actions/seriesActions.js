import services from "../services/firebase"

export const SET_SERIES = 'SET_SERIES';
export const setSeries = series => ({
    type: SET_SERIES,
    series,
})

export const watchSeries = () => {
    return (dispatch) => {
        const seriesDb = services.seriesDb()

        seriesDb.on('value', (snapshot) => {
            const series = snapshot.val()
            const action = setSeries(series)
            dispatch(action)
        })
    }
 }