import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import {location, connexion} from '../../../http/urlReseaux';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  connexionUrl = location + connexion;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  private getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('userToken');
    }
    return this.token;
  }

  isLoggedIn(): boolean {
    const user = this.getToken();
    return !!user;
  }

  isAdmin(): boolean {

    if (this.token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.getToken());

      return (decodedToken.admin === 1);
    }
  }

  login(mail: string, mdp: string) {
    return this.http.post<any>(this.connexionUrl, { mail, mdp })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('userToken', JSON.stringify(user));
          this.token = JSON.stringify(user);
        }
        this.router.navigate(['Accueil']).then();
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userToken');
    this.router.navigate(['Connexion']).then();
  }
}
