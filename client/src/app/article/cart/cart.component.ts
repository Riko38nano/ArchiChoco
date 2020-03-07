import { Component, OnInit } from '@angular/core';
import {CartService} from './cart.service';
import {Article} from '../article';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Article[];
  error: string;
  info: string;
  formCmd: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.formCmd = this.formBuilder.group({
      consigne: [''],
      livraison: [false]
    });
  }

  get f() { return this.formCmd.controls; }

  getTotal(): number {
    let count = 0;
    for (const item of this.items) {
      count += item.Prix;
    }
    return parseFloat(count.toFixed(2));
  }

  delFromCart(article: Article) {
    const id = this.items.indexOf(article, 0);
    if (id > -1) {
      this.items.splice(id, 1);
    }
  }

  passerCommande() {
    if (this.items.length <= 0) {
      return;
    }

    const numArtList = [];

    // stockage des numArt pour ajout dans la table ligneCmd
    for (let i = 0; i < this.items.length; i++) {
      numArtList[i] = this.items[i].NumArt;
    }

    let livraison = 0;
    // this.f.Livraison.value est un boolean relié à un bouton checkbox
    if (this.f.livraison.value) {
      livraison = 1;
    }

    this.cartService.addCommand(this.f.consigne.value, livraison, numArtList).subscribe();
    this.items = this.cartService.clearCart(); // on vide le panier
    this.formCmd.reset(); // on vide les champs du formulaire

    this.info = 'Commande passé avec succés';
  }
}
