import {action, makeObservable, observable} from "mobx";
import {UserInfoType} from "../types/types";

export class AuthStore {
    auth: boolean = false
    userInfo: UserInfoType | null = null
    counter: number = 0
    authInProgress = false
    authFinish = false

    constructor() {
        makeObservable(this,
            {
                auth: observable,
                userInfo: observable,
                counter: observable,
                authInProgress: observable,
                authFinish: observable,
                setAuth: action.bound,
                setUserInfo: action.bound,
                setCounter: action.bound,
                setAuthInProgress: action.bound,
                setAuthFinish: action.bound,
            }
        )
    }

    setAuth(auth: boolean) {
        this.auth = auth
    }

    setUserInfo(userInfo: UserInfoType | null) {
        this.userInfo = userInfo
    }

    setCounter(counter: number) {
        this.counter = counter;
    }

    setAuthInProgress(authInProgress: boolean) {
        this.authInProgress = authInProgress;
    }

    setAuthFinish(authFinish: boolean) {
        this.authFinish = authFinish;
    }

}
