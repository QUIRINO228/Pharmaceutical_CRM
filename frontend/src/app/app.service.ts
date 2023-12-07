import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";
import {Product} from './Product';
import {ForgotCodeDTO} from './ForgotCodeDTO'
import {MatDialog} from '@angular/material/dialog';
import {RegistrationComponent} from "./components/registration/registration.component";
import {AddproductComponent} from "./components/addproduct/addproduct.component";
import {UpdateproductComponent} from "./components/updateproduct/updateproduct.component";
import {StorageService} from "./services/storage/storage.service";
import {ForgotMessageComponent} from "./components/forgot-message/forgot-message.component";
import {OrderDTO} from "./OrderDTO";


@Injectable({
    providedIn: 'root'
})
export class AppService {

    private url = "http://localhost:8080"

    constructor(private http: HttpClient, private dialog: MatDialog) {
    }

    login(user: User): Observable<User> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post<User>(`${this.url}/login`, user, {headers});
    }

    forgotMessage(email: String): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post<User>(`${this.url}/forgot`, email, {headers});
    }

    changePassword(link: string, forgotCodeDTO: ForgotCodeDTO): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post(`${this.url}/changePassword/${link}`, forgotCodeDTO, {headers});
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.url}/delete/${id}`, {headers: this.createAuthorizationHeader()});
    }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.url}/registration`, user, { headers });
  }

    addProduct(formData: FormData): Observable<Product> {
        return this.http.post<Product>(`${this.url}/add`, formData, {headers: this.createAuthorizationHeader()});
    }

    getProductForStorage(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/storage`, {headers: this.createAuthorizationHeader()})
    }

    getProduct(): Observable<any[]> {
        const headers = new HttpHeaders();
        return this.http.get<any[]>(`${this.url}/products`, {headers})
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.url}/product/${id}`, {headers: this.createAuthorizationHeader()})
    }

    updateProduct(id?: number, product?: any): Observable<any> {
        return this.http.put<any>(`${this.url}/update/${id}`, product, {headers: this.createAuthorizationHeader()})
    }

    checkActivateCode(link: string, code: number | null | undefined): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post(`${this.url}/activate/${link}`, code, {headers});
    }


    openAddProductDialog(): void {
        this.dialog.open(AddproductComponent, {})
    }

    openRegistrationDialog(): void {
        this.dialog.open(RegistrationComponent, {});
    }

    createAuthorizationHeader(): HttpHeaders {
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
            'Authorization', "Bearer " + StorageService.getToken()
        );
    }

    openForgotPasswordDialog() {
        this.dialog.open(ForgotMessageComponent, {
            height: '200px',
            width: '400px',
        });
    }

    openUpdateProductDialog() {
        this.dialog.open(UpdateproductComponent, {});

    }

    addToBasket(requestData: any) {
        return this.http.post('http://localhost:8080/addToBasket', requestData, {headers: this.createAuthorizationHeader()});
    }

    getUserTasks(userId: number): Observable<any> {
        return this.http.get(`${this.url}/my-tasks/${userId}`, {headers: this.createAuthorizationHeader()})
    }

  getBasket(userId: number | null) : Observable<any> {
    return this.http.get(`${this.url}/basket/${userId}`, {headers: this.createAuthorizationHeader()} )
  }

  createOrder(orderDTO: OrderDTO): Observable<any> {
    return this.http.post(`${this.url}/create-order`, orderDTO, {headers: this.createAuthorizationHeader()});
  }

  removeFromBasket(userId: number | null, productId: number): Observable<any> {
        return this.http.delete(`${this.url}/basket/remove/${userId}/${productId}`, { headers: this.createAuthorizationHeader() });
    }

  clearBasket(userId: number | null): Observable<any> {
        return this.http.delete(`${this.url}/basket/delete/${userId}`, { headers: this.createAuthorizationHeader() });
    }


  getAllTasks(): Observable<any> {
    return this.http.get(`${this.url}/orders`, {headers: this.createAuthorizationHeader()} )
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get(`${this.url}/order/`+orderId, {headers: this.createAuthorizationHeader()})
  }

  getOrdersByUserId(userId: number | null) {
    return this.http.get(`${this.url}/orders/`+userId, {headers: this.createAuthorizationHeader()})
  }

  updateOrderUser(orderId: number | undefined, userId: string):Observable<any> {
    return this.http.post(`${this.url}/confirm/`+orderId, userId,{headers: this.createAuthorizationHeader()})
  }

  cancelOrder(orderId: number | undefined) {
      return this.http.post(`${this.url}/cancel`, orderId,{headers: this.createAuthorizationHeader()})
  }

    CompleteTask(id: number) {
        return this.http.post(`${this.url}/complete`, id,{headers: this.createAuthorizationHeader()})
    }

    completeOrder(orderId: number | undefined) {
        return this.http.post(`${this.url}/complete-order`, orderId,{headers: this.createAuthorizationHeader()})
    }
}
