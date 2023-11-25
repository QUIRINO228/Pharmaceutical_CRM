import {Injectable} from '@angular/core';

const USER = "User"
const TOKEN = "Token"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
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
    return window.localStorage.getItem(TOKEN) || '';
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER)|| '')
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
      return true;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  static isWorkerLoggedIn(): boolean {
    if (this.getToken() == null) {
      return true;
    }
    const role: string = this.getUserRole();
    return role == "WORKER";
  }


}
