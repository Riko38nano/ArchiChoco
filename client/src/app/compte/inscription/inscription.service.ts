import { Injectable } from '@angular/core';
import {Compte} from '../Compte';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {inscription, location} from "../../http/urlReseaux";
import {httpOptions} from "../../http/httpOption";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  clientUrl = location + inscription;

  constructor(
      private http: HttpClient
  ) {}

  addClient(client: Compte) {
    return this.http.post<Compte>(this.clientUrl, client, httpOptions).pipe()
  }
}
