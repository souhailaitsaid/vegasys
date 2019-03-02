import { Injectable } from '@angular/core';

export interface UserInStorage {
    userId: number;
    username: string;
    email: string;
    displayName: string;
    token: string;
    roles: string[];
    client:any
}

export interface LoginInfoInStorage {
    success: boolean;
    message: string;
    landingPage: string;
    user?: UserInStorage;
}

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    public currentUserKey: string = "currentUser";
    public storage: Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)

    constructor() { }

    //Store userinfo from session storage
    storeUserInfo(userInfoString: string) {
        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    //Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
    }

    //Get userinfo from session storage
    getUserInfo(): UserInStorage | null {
        try {
            let userInfoString: string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                let userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
                //console.log(userObj)
                return userObj;
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }

    isLoggedIn(): boolean {
        return this.storage.getItem(this.currentUserKey) ? true : false;
    }

    //Get User's Display name from session storage
    getUserName(): string {
        let userObj: UserInStorage = this.getUserInfo();
        //console.log(userObj)
        if (userObj !== null) {
            return userObj.username
        }
        return "no-user";
    }

    isAdmin() {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
           // console.log('isAdmin : '+(userObj.roles.indexOf("ADMIN") > -1))
            return userObj.roles.indexOf("ADMIN") > -1
        }
       
        return false
    }

    isUser() {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.roles.indexOf("USER") > -1
        }
        return false
    }

    getStoredToken(): string | null {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.token;
        }
        return null;
    }
}
