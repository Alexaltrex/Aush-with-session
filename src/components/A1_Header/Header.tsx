import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import {links, notAuthLinks} from "../A0_App/routes";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {authApi} from "../../api/auth.api";

export const Header = observer(() => {
    const {authStore: {userInfo, auth, setAuth, setUserInfo}} = useStore();

    const logoutHandler = async () => {
        try {
            await authApi.logout();
            setAuth(false);
            setUserInfo(null);
        } catch (e: any) {
            console.log(e.message)
        }

    }

    return (
        <header className={style.header}>
            <Link to="/"
                  className={style.logo}
            >
                Auth Session
            </Link>

            <div className={style.right}>
                <nav className={style.links}>
                    {
                        (auth ? links : notAuthLinks).map(({label, to}, index) => (
                            <Link to={to}
                                  key={index}
                                  className={style.link}
                            >
                                {label}
                            </Link>
                        ))
                    }
                    <button className={clsx(style.link, style.logout)}
                            onClick={() => logoutHandler()}
                    >
                        Logout
                    </button>
                </nav>
                {
                    userInfo &&
                    <div className={style.userInfo}>
                        <p>{userInfo.login}</p>
                        <p>{userInfo.email}</p>
                    </div>
                }
            </div>

        </header>
    )
})
