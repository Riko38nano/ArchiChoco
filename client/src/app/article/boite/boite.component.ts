import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Article} from '../article';
import {ArticleListService} from '../article-list/article-list.service';
import {ArticleListComponent} from '../article-list/article-list.component';
import {AuthService} from '../../compte/auth/service/auth.service';
import {BoiteService} from './boite.service';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-boite',
  templateUrl: './boite.component.html',
  styleUrls: ['./boite.component.scss']
})
export class BoiteComponent implements OnInit {

  formBoite: FormGroup;
  error: string;
  totalParfum = 100;
  id: number;

  chartOptions = {
    responsive: true
  };
  /*
    chartData = [
      this.getVal.noisette.value,
      this.getVal.alcool.value,
      this.getVal.blanc.value,
      this.getVal.noir.value,
      this.getVal.auLait.value,
      this.getVal.praline.value
    ];
  */

  chartData = [
    30, 0, 50, 0, 10, 10
  ];

  chartLabels = [
    'Noisette',
    'Alcool',
    'Blanc',
    'Noir',
    'Au lait',
    'Praline'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private articleListService: ArticleListService,
    private articleListComponent: ArticleListComponent,
    private authService: AuthService,
    private boiteService: BoiteService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.formBoite = this.formBuilder.group({
      qte: [500],
      noisette: [30],
      alcool: [0],
      blanc: [50],
      noir: [0],
      auLait: [10],
      praline: [10],
    });

    this.updateChart();
  }

  // getter pour les valeurs des formulaires
  get getVal() {
    return this.formBoite.controls;
  }

  // actualise les données affiché par le graphique
  updateChart() {
    this.chartData = [
      this.getVal.noisette.value,
      this.getVal.alcool.value,
      this.getVal.blanc.value,
      this.getVal.noir.value,
      this.getVal.auLait.value,
      this.getVal.praline.value
    ];
  }

  calculPrix() {
    const quantite = this.getVal.qte.value;
    const noisette = this.getVal.noisette.value;
    const alcool = this.getVal.alcool.value;
    const blanc = this.getVal.blanc.value;
    const noir = this.getVal.noir.value;
    const auLait = this.getVal.auLait.value;
    const praline = this.getVal.praline.value;

    // prix entre 20,30 € pour 500g donc 6 € pour 100g

    return parseFloat((quantite / 100 * (noisette / 100 + 1.18) * (alcool / 100 + 1.18) *
      (blanc / 100 + 1.2) * (noir / 100 + 1.18) * (auLait / 100 + 1.18) * (praline / 100 + 1.18)).toFixed(2));
  }

  addArt(article: Article) {
    this.boiteService.addArticle(article).subscribe(
      added => {
        // rafiraichit la liste des articles
        this.articleListComponent.getArticlesList();
        // added.InsertId est l'identifiant de la boite créé dans la base
        this.id = added.insertId;
      },
      error => this.error = error,
      () => {
        // ceci s'execute une fois la requête terminé, pour être sûr d'avoir un identifiant de la boite créée
        if (!this.isAdmin()) {
          // ajout de la boite du client au panier, avec ajout de l'identifiant de la base de la boite créée
          this.cartService.addToCart(article, this.id);
        }
      }
    );
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  // création de l'objet article par le client
  postBoite() {
    const article: Article = {
      Prix: this.calculPrix(),
      Type: 'boites',
      quantite: this.getVal.qte.value,
      noisette: this.getVal.noisette.value,
      alcool: this.getVal.alcool.value,
      blanc: this.getVal.blanc.value,
      noir: this.getVal.noir.value,
      au_lait: this.getVal.auLait.value,
      praline: this.getVal.praline.value,
    };
    this.addArt(article);
  }

  is100Calcul() {
    // fonction qui somme la liste des valeurs des parfums et s'assure que le bouton n'apparraise pas
    // si la somme ne fait pas 100 %
    const noisette = this.getVal.noisette.value;
    const alcool = this.getVal.alcool.value;
    const blanc = this.getVal.blanc.value;
    const noir = this.getVal.noir.value;
    const auLait = this.getVal.auLait.value;
    const praline = this.getVal.praline.value;

    this.totalParfum = noisette + alcool + blanc + noir + auLait + praline;
    return this.totalParfum === 100;
  }
}
