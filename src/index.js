import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HeaderContainer from './components/Header/HeaderContainer';
import {Provider} from 'react-redux'
import store from './redux/redux-store'
import App from './App'
import WeekCardsContainer from './components/WeekCards/WeekCardsContainer';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App/>
    <HeaderContainer/>
    <WeekCardsContainer/>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();