import React, {useEffect} from 'react';
import style from "./App.module.scss";
import {Header} from "../A1_Header/Header";
import {routes} from "./routes";
import {Route, Routes } from 'react-router-dom';
import {authApi} from "../../api/auth.api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

export const App = observer(() => {
    const {authStore: {
        setUserInfo,
        setAuth,
        authInProgress,
        setAuthInProgress,
        auth,
        setAuthFinish
    }} = useStore()

    useEffect(() => {
        console.log('auth: ', auth);
        console.log('authInProgress: ', authInProgress);
    }, [auth, authInProgress])


    useEffect(() => {
        const handler = async () => {
            try {
                setAuthInProgress(true);
                const response = await authApi.userInfo();
                setUserInfo(response.data);
                setAuth(true)
                //console.log(response)
            } catch (e: any) {
                console.log(e.message)
            } finally {
                setTimeout(() => setAuthInProgress(false));

            }
        }
        handler().then(r => {})


    }, []);

    useEffect(() => {
       if (!authInProgress) {
           setAuthFinish(true)
       }
    }, [authInProgress])


    return (
        <div className={style.app}>
            <Header/>
            <main className={style.main}>
               <Routes>
                   {
                       routes.map(({path, element}, index) => (
                           <Route key={index} path={path} element={element}/>
                       ))
                   }
               </Routes>
            </main>
        </div>
    );
})

