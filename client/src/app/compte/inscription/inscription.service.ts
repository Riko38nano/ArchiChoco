import { Injectable } from '@angular/core';
import {Compte} from '../Compte';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  clientUrl = 'http://localhost:8085/inscription';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addClient(client: Compte) {
    return this.http.post<Compte>(this.clientUrl, client, this.httpOptions)
      .pipe(map(user => {

      }));
  }

  constructor(
    private http: HttpClient
  ) {}
}
