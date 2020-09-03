import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import AppWithReducers from "./trash/AppWithReducers";

const AppWithReducersComponent = AppWithReducers;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);


serviceWorker.unregister();
