import {makeAutoObservable} from "mobx";
import * as userAPI from "../service/userAPI";
import AuthService from "../service/AuthService";
import axios from "axios";

export default class UserStore {

    user = {} ;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.token);
            this.isAuth(true);
            this.setUser(response);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} );
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

}