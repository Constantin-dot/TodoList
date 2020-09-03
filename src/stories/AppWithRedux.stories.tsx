import React from "react";
import App from "../app/App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default  {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <App />
}