import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public BaseAPIUrl = '';

  constructor(
    public httpClient: HttpClient
  ) { }

  get(url, isJsonFile: boolean = false) {
    if (isJsonFile === false) url = this.BaseAPIUrl + url;
    return this.httpClient.get(url).toPromise();
  }
}
