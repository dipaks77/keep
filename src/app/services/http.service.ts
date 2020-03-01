import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // Base url of API
  public BaseAPIUrl = 'http://localhost:8080';

  // Dependencies
  constructor(
    public httpClient: HttpClient
  ) { }

  // http get method
  get(url, isJsonFile: boolean = false) {
    if (isJsonFile === false) url = this.BaseAPIUrl + url;
    return this.httpClient.get(url).toPromise();
  }

  // http post method
  post(url, params) {
    url = this.BaseAPIUrl + url;
    return this.httpClient.post(url, params).toPromise();
  }

  // http put method
  put(url, params) {
    url = this.BaseAPIUrl + url;
    return this.httpClient.put(url, params).toPromise();
  }

  // http delete method
  delete(url) {
    url = this.BaseAPIUrl + url;
    return this.httpClient.delete(url).toPromise();
  }
}
