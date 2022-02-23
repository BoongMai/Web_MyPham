import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json', 'Access-Control-Allow-Origin': '*' })
  }
  apiURI = 'http://localhost:5000/api/products'
  // apiURI = "https://hame-comestic-api.herokuapp.com/api/products"
  constructor(private http:HttpClient) { }


  searchProducts(filter: any): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.apiURI}?page=${filter['page'] -1}${filter['product_id']?'&id=' + filter['product_id']: ''}${filter['category_id']?'&product_cat=' + filter['category_id']: ''}`, this.httpOptions).pipe();

  }


}
