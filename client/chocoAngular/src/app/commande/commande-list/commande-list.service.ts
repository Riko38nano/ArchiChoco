import { Injectable } from '@angular/core';
import {Commande} from '../commande';
import {Observable} from 'rxjs';
import {commande, location} from '../../http/urlReseaux';
import {HttpClient} from '@angular/common/http';
import {httpOptions} from '../../http/httpOption';

@Injectable({
  providedIn: 'root'
})
export class CommandeListService {
  commandeUrl = location + commande;

  constructor(
    private http: HttpClient
  ) { }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.commandeUrl);
  }

  delCommande(id: number): Observable<any> {
    const url = `${this.commandeUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe();
  }

  addCommande(idCli: number, consigne: string, livraison: number): Observable<any> {
    return this.http.post(this.commandeUrl, {idCli, consigne, livraison}, httpOptions).pipe();
  }

}
