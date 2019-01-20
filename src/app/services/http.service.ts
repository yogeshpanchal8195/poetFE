import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  constructor(private http: HttpClient) {  }


  fetchData(url: string, data: Object, callback, error) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });

    this.http.get(url, { observe: 'response', params: httpParams }).subscribe((response: HttpResponse<any>) => {
      if (response) {
        if (response.body) {
          callback(response.body);
          // this.updateUserData(response.body);
        }
      }
    }, (err) => {
      console.log(err.error);
      error(err.error)
    })
  }

  favouriteData(url: string, data: Object, callback, error) {
    this.http.post(url, data).subscribe((response: HttpResponse<any>) => {
      if (response) {
          callback(response);
      }
    }, (err) => {
      console.log(err.error);
      error(err.error)
    })
  }


}
