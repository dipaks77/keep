import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public BaseAPIUrl = 'http://localhost:8080';

  constructor(
    public httpClient: HttpClient
  ) { }

  get(url, isJsonFile: boolean = false) {
    if (isJsonFile === false) url = this.BaseAPIUrl + url;
    return this.httpClient.get(url).toPromise();
  }

  post(url, params) {
    url = this.BaseAPIUrl + url;
    return this.httpClient.post(url, params).toPromise();
  }

  put(url, params) {
    url = this.BaseAPIUrl + url;
    return this.httpClient.put(url, params).toPromise();
  }

  delete(url) {
    url = this.BaseAPIUrl + url;
    return this.httpClient.delete(url).toPromise();
  }
}
