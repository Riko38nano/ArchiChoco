import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {commande, location} from '../../http/urlReseaux';
import {Article} from '../article';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  url = location + commande;

  constructor(private http: HttpClient) {
  }

  addToCart(product: Article, id?: number) {
    if (id) { // si le client vient de créer une boite et veut la commander
      const article: Article = { // objet pour rajouter le NumArt de la boite
        NumArt: id,
        Prix: product.Prix,
        Type: 'boites',
        alcool: product.alcool,
        blanc: product.blanc,
        noir: product.noir,
        noisette: product.noisette,
        au_lait: product.au_lait,
        praline: product.praline,
        quantite: product.quantite
      };

      this.items.push(article);
    } else {
      this.items.push(product);
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  addCommand(consigne, livraison, artList) {
    return this.http.post<any>(this.url, {consigne, livraison, artList}).pipe();
  }
}
