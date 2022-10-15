import {App} from "./App";
import {HashRouter} from "react-router-dom";
import {RootStore, store} from "../../store/RootStore";
import React, {createContext} from "react";

export const StoreContext = createContext<RootStore>({} as RootStore)

export const AppContainer = () => {
    return (
        <StoreContext.Provider value={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </StoreContext.Provider>
    )
}
