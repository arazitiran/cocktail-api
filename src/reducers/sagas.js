import { call, put, takeEvery } from 'redux-saga/effects'

async function fetchDataFromAPI(_idDrink) {
    let urlToFetch = _idDrink==0 ? "https://the-cocktail-db.p.rapidapi.com/filter.php?c=Cocktail" : `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${_idDrink}`;
    console.log(urlToFetch); 
    return fetch(urlToFetch, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
            "x-rapidapi-key": "caa3233c27msh5576ea03ecae676p1b4648jsnfd9181f28ab6"
        }
    })
        .then(res => res.json())
        .then(data => {
            // you can access your data here
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
        });
}

function* fetchData(action) {
    try {
        const fetchedData = yield call(fetchDataFromAPI, action.payload.idDrink);
        yield put({ type: "SET_ALL_DRINKS", payload: { allDrinks: fetchedData } });
    } catch (e) {
        yield put({ type: "FETCH_ERROR", payload: { exception: e } });
    }
}

function* fetchDataExpended(action) {
    try {
        const fetchedData = yield call(fetchDataFromAPI, action.payload.idDrink);
        yield put({ type: "SET_EXPENDED_DRINK", payload: { expendedDrink: fetchedData } });
    } catch (e) {
        yield put({ type: "FETCH_ERROR", payload: { exception: e } });
    }
}

function* rootSaga() {
    yield takeEvery("FETCH_DATA", fetchData);
    yield takeEvery("FETCH_DATA_EXPENDED", fetchDataExpended)
}

export default rootSaga;