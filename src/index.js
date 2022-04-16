import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './main/MainApp.js';
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <MainApp />, 
    document.querySelector('#root')
);
