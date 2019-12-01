import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { drinksReducer } from './reducers/drinksReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './reducers/sagas'
import { createStore, applyMiddleware } from 'redux';
import WeeklySchedule from './Components/WeeklySchedule';
import DrinkCardExtended from './Components/DrinkCardExtended';
import 'bootstrap/dist/css/bootstrap.min.css';
import HTML5Backend from 'react-dnd-html5-backend' // Drag and drop cap for app
import { DndProvider } from 'react-dnd' // Drag and drop cap for app

const sagaMiddleware = createSagaMiddleware()

const store = createStore(drinksReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

function App() {
 
  useEffect(() => {
    store.dispatch({ type: "FETCH_DATA", payload: { idDrink: 0 } });
  }, [])

  return (

    <React.Fragment>
          <DndProvider backend={HTML5Backend}>
       <Provider store={store}>
       <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/WeeklySchedule" component={WeeklySchedule} />
          <Route exact path="/about" />
          <Route exact path="/drink-card/:idDrink" component={DrinkCardExtended} />
          <Route path="*" /*component={}}*/ />
        </Switch>

      </Router>
       </Provider>
       </DndProvider>
    </React.Fragment>
  );
}

export default App;
