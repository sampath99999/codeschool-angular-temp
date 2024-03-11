import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  public getHeaders() {
    let token = localStorage.getItem("token") || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
  }

  public getData(endpoint: string, data = {}) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.BASE_URL + endpoint, { params: data, headers: this.getHeaders() }).subscribe((res) => {
          resolve(res);
        },
        (error) => {
          if (error.status == 401) {
            this.handleApiError(error);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  public postData(endpoint: string, data = {}) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.BASE_URL + endpoint, data, { headers: this.getHeaders() }).subscribe((res) => {
          resolve(res);
        },
        (error) => {
          if (error.status == 401) {
            this.handleApiError(error);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  public handleApiError(error: HttpErrorResponse) {
    if (error.status == 401){
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
}
