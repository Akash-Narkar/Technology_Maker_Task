import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  //getting data from api
  apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<any[]>(this.apiUrl);
  }
  getProductRating(productId: number) {
    const url = `${this.apiUrl}/products/${productId}/rating`;
    return this.http.get<any>(url);
  }
}
