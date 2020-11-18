import React from "react";
import App from "../app/App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default  {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <App demo={true}/>
}