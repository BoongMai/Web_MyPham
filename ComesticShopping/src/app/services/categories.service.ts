import { Category } from './../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json', 'Access-Control-Allow-Origin': '*' })
  }
  apiURI = 'http://localhost:5000/api/categories'
  // apiURI = "https://hame-comestic-api.herokuapp.com/api/categories"

  constructor(private http: HttpClient) { }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiURI, this.httpOptions).pipe()
  }
  getCategoryDetail(categoryID: string):Observable<Category[]>{
    return this.http.get<Category[]>(this.apiURI+'?category_id='+categoryID).pipe()
  }
}
