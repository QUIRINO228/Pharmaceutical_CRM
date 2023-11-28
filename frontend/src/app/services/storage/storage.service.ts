import {Injectable} from '@angular/core';
import {Router} from "@angular/router";


const USER = "User"
const TOKEN = "Token"

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private router: Router) {
    }

    public saveUser(user: any) {
        window.localStorage.removeItem(USER);
        window.localStorage.setItem(USER, JSON.stringify(user))
    }

    public saveToken(token: string | undefined) {
        window.localStorage.removeItem(TOKEN);
        if (typeof token === "string") {
            window.localStorage.setItem(TOKEN, token);
        }
    }

    static getToken(): string {
      // @ts-ignore
      return window.localStorage.getItem(TOKEN);
    }

    static getUser(): any {
        // @ts-ignore
        return JSON.parse(localStorage.getItem(USER))
    }

    static hasToken() {
        return this.getToken() !== null;

    }

    static getUserRole(): string {
        const user = this.getUser();
        if (user == null) {
            return '';
        }
        return user.role;
    }

    static isAdminLoggedIn(): boolean {
        if (this.getToken() == null) {
            return false;
        }
        const role: string = this.getUserRole();
        return role == "ADMIN";
    }


    static isManagerLoggedIn(): boolean {
        if (this.getToken() == null) {
            return false;
        }
        const role: string = this.getUserRole();
        return role == "MANAGER";
    }

    static isUserLoggedIn(): boolean {
        if (this.getToken() == null) {
            return false;
        }
        const role: string = this.getUserRole();
        return role == "USER";
    }

  static isWorkerLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "WORKER";
  }

    static logout() {
        window.localStorage.removeItem(TOKEN)
        window.localStorage.removeItem(USER)
    }
}
