import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";
import {Product} from './Product';
import {ProductDTO} from "./ProductDTO";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<User>(`${this.url}/registration`, user, {headers});
  }

  login(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<User>(`${this.url}/login`, user, {headers});
  }


  addProduct(formData: FormData): Observable<Product> {
    const headers = new HttpHeaders();
    return this.http.post<Product>(`${this.url}/add`, formData, { headers });
  }


  getProduct(): Observable<any[]> {
    const headers = new HttpHeaders();
    return this.http.get<any[]>(`${this.url}/products`, { headers })
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/product/${id}`)
  }

  updateProduct(id?: number, product?: any): Observable<any> {
    return this.http.put<any>(`${this.url}/update/${id}`, product)
  }

  checkActivateCode(link: string, code: number | null | undefined): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}/activate/${link}`, code, { headers });
  }
}
