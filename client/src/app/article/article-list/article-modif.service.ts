import { Injectable } from '@angular/core';
import {Article} from '../article';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {httpOptions} from '../../http/httpOption';
import {location, article} from '../../http/urlReseaux';

@Injectable({
  providedIn: 'root'
})
export class ArticleModifService {

  articleUrl = location + article;

  constructor(private http: HttpClient) { }

  modifArticle(id: number, chaine: string) {
    const url = `${this.articleUrl}/${id}`;
    return this.http.put<Article>(url, {chaine}, httpOptions).pipe();
  }
}
