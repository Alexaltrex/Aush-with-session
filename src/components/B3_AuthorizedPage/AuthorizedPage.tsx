import React from "react";
import style from "./AuthorizedPage.module.scss";
import {Button} from "@mui/material";
import {authApi} from "../../api/auth.api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {Navigate} from "react-router-dom";

export const AuthorizedPage = observer(() => {
    const {authStore: {
        counter,
        setCounter,
        auth,
        authInProgress,
        authFinish
    }} = useStore();

    const onClick = async () => {
        try {
            const response = await authApi.counter();
            setCounter(response.data);
        } catch (e: any) {
            console.log(e.message)
        }
    }

    if (authInProgress && !authFinish) {
        return (
            <p>auth in progress...</p>
        )
    }

    if (!auth && !authInProgress && authFinish) {
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <div className={style.authorizedPage}>
            <h1>Authorized Page</h1>
            <p className={style.description}>
                {
                    `
                    Авторизованный post-запрос на сервер, который увеличивает значение переменной 
                    counter на 1 и возвращает новое значение. Сама переменная хранится в хранилище сессии. 
                    `
                }
            </p>

            <p className={style.counter}>
                <span>Counter: </span>
                {counter}
            </p>

            <Button variant='contained'
                    onClick={onClick}
                    className={style.btn}
            >
                Counter
            </Button>

        </div>
    )
})
