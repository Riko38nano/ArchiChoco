import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {compta, location} from '../http/urlReseaux';

@Injectable({
  providedIn: 'root'
})
export class ComptaService {

  url = location + compta;

  constructor(private http: HttpClient) { }

  getCompta(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
