import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {BrowserRouter,Redirect,Route,withRouter } from 'react-router-dom';
import store from './redux/redux-store'
import App from './App'
import HeaderContainer from './components/Header/HeaderContainer';
import WeekCardsContainer from './components/WeekCards/WeekCardsContainer';
import WeatherMapComponent from './components/WeekCards/WeatherMap/WeatherMapComponent';
import s from './index.module.css';


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
  <div className={s.root_Main}>

    <HeaderContainer/>
    <Route exact path='/' 
    ><Redirect to="/WeatherMain" /></Route>
    
    <Route exact path='/WeatherMap' component={WeatherMapComponent}/>
    <Route exact path='/WeatherMain' component={withRouter(WeekCardsContainer)}/>   

  </div>  
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();