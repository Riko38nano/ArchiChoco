import { Injectable } from '@angular/core';
import {Article} from '../article';
import {httpOptions} from '../../http/httpOption';
import {HttpClient} from '@angular/common/http';
import {location, boite} from '../../http/urlReseaux';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoiteService {

  boiteUrl = location + boite; // /boite

  constructor(private http: HttpClient) { }

  // Crée la requete post
  addArticle(newArticle: Article): Observable<any> {
    return this.http.post<Article>(this.boiteUrl, newArticle, httpOptions).pipe();
  }
}
