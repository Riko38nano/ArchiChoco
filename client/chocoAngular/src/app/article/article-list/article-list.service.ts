import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Article } from '../article';

import {httpOptions} from '../../http/httpOption';
import {location, article} from '../../http/urlReseaux';

@Injectable({
  providedIn: 'root'
})
export class ArticleListService {

  private articleUrl = location + article;

  constructor(
    private http: HttpClient
  ) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articleUrl);
  }

  addArticle(newArticle: Article) {
    return this.http.post<Article>(this.articleUrl, newArticle, httpOptions).pipe();
  }

  delArticle(id: number) {
    const url = `${this.articleUrl}/${id}`;
    return this.http.delete<any>(url, httpOptions).pipe();
  }

  modArticle(id: number, Prix: number, chaine: string, Affichage: number) {
    const url = `${this.articleUrl}/${id}`;
    return this.http.put<any>(url, { chaine, Prix, Affichage }).pipe();
  }
}
