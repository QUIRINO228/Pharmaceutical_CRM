import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../services/storage/storage.service";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private url = "http://localhost:8080"

    constructor(private http: HttpClient) {
    }



    changeUserRole(userId: number, newRole: string | undefined): Observable<any> {
    const url = `${this.url}/users/${userId}/role`;
    const body = { newRole };

    return this.http.put(url, body, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', "Bearer "+ StorageService.getToken()
    );
  }



    getAllUsers(): Observable<any> {
        return this.http.get<[]>(this.url + "/users", {headers: this.createAuthorizationHeader()})
    }

    deleteUser(userId: number): Observable<any> {
        const url = `${this.url}/user/delete/${userId}`;
        return this.http.delete(url, { headers: this.createAuthorizationHeader() });
    }

    updateUser(userId: number, newData: { firstName: any; lastName: any; role: any; email: any }): Observable<any> {
        const url = `${this.url}/user/update/${userId}`;
        const body = { ...newData };

        return this.http.put(url, body, { headers: this.createAuthorizationHeader() });
    }

    getAllTasks() {
        return this.http.get( this.url+"/tasks", { headers: this.createAuthorizationHeader() });
    }

    getTask(id: number) {
        return this.http.get( this.url+"/task/"+id, { headers: this.createAuthorizationHeader() });
    }

    addTask(newTask: any): any {
        return this.http.post( this.url+"/task/add", newTask,{ headers: this.createAuthorizationHeader() });
    }


    deleteTask(taskId: number):any {
        return this.http.delete(this.url+"/task/delete/"+taskId, { headers: this.createAuthorizationHeader() })
    }


    updateTask(taskId: any, taskData: { header: any; description: any; email: any; taskStatus: any }): any {
        return this.http.put(this.url + "/task/update/" + taskId, taskData, { headers: this.createAuthorizationHeader() });
    }
}
