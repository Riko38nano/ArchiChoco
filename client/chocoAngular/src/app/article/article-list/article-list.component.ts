import {Component, OnInit} from '@angular/core';
import {ArticleListService} from './article-list.service';
import {Article} from '../article';
import {AuthService} from '../../compte/auth/service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {timeInterval} from 'rxjs/operators';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})

export class ArticleListComponent implements OnInit {

  articles: Article[];
  count = 0;
  error: string;
  info: string;
  ok: string;

  // popped decide si on fait apparaitre le formulaire d'ajout d'article
  popped: boolean;
  // popped modif est un tableau car il y a plusieurs formulaire de modification pour chaque articles
  poppedModif = [false];

  addArtForm: FormGroup;
  // un tableau de formulaire pour chaque article affiché
  // modArtForm: FormGroup[];
  modArtForm: FormGroup;
  displayBoite = false;

  constructor(
    private articleListService: ArticleListService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    // rempli le tableau d'Article
    this.getArticlesList();

    // créé le formulaire d'ajout
    this.addArtForm = this.formBuilder.group({
      type: [null, Validators.required],
      prix: [null, Validators.required],
      chaine: [null, Validators.required]
    });

    this.modArtForm = this.formBuilder.group({
      prix: [null],
      chaine: [null],
      affichage: [null]
    });

    // this.initFormMod();
    /*
        for (let i = 0; i < this.articles.length; i++) {
          this.modArtForm[i] = null;
        }
        */
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  // fait apparitre le fomrulaire d'ajout d'article
  popUpAddArtChamp() {
    this.popped = !this.popped;
  }

  // fait apparaitre le formulaire de modification d'article
  popUpFormModif(id: number) {
    this.poppedModif[id] = !this.poppedModif[id];
  }

  get addVal() {
    return this.addArtForm.controls;
  }

  get modVal() {
    return this.modArtForm.controls;
  }

  fullModifPopped() {
    if (this.articles) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.articles.length; i++) {
        this.poppedModif[i] = false;
      }
    }
  }

  private initFormMod() {
    if (this.articles) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.articles.length; i++) {

        this.modArtForm[i] = this.formBuilder.group({
          prix: [null],
          chaine: [null],
          affichage: [null]
        });
      }
    }
  }

  getArticlesList() {
    this.articleListService.getArticles()
      .subscribe(
        article => {
          this.articles = article;
          this.fullModifPopped();
          if (this.count === 0) {
            this.initFormMod();
            this.count++;
          }
        },
        err => {
          this.error = err;
        }
      );
  }

  addArticle(prix: number, chaine: string, type: string) {

    if (type === 'autres') {

      this.articleListService.addArticle({Prix: prix, Type: 'autres', description: chaine} as Article)
        .subscribe(() => {
            this.getArticlesList();
            this.ok = 'Ajout réussi';
          },
          err => {
            this.error = err;
          }
        )
      ;
    } else if (type === 'tablettes') {

      this.articleListService.addArticle({Prix: prix, Type: 'tablettes', typeChoco: chaine} as Article)
        .subscribe(() => {
            this.getArticlesList();
            this.ok = 'Ajout réussi';
          },
          error1 => {
            this.error = error1;
          }
        );
    }
  }

  modifArticle(id: number, prix?: number, chaine?: string, affichage?: number) {
    this.articleListService.modArticle(id, prix, chaine, affichage).subscribe(
      () => {
        this.getArticlesList();
        this.ok = 'Modification réussi';
      },
      err => {
        this.error = err;
      }
    );
  }

  delArt(id: number) {
    this.articleListService.delArticle(id).subscribe(
      deleted => {
        this.getArticlesList();
        this.info = deleted.info;
        this.ok = 'Suppression réussi';
      },
      err => this.error = err
    );
  }

  submitAddArticle() {

    if (this.addArtForm.invalid) {
      return;
    }

    // disable the check button
    this.popped = false;
    const button = document.getElementById('buttonAddArt') as HTMLInputElement;
    button.checked = false;

    // ici le prix la description peuvent etre vide, dans le back on vérifiera dans le body quels champs sont renseignés
    this.addArticle(parseFloat(this.addVal.prix.value), this.addVal.chaine.value, this.addVal.type.value);

    // vide la valuer des champs du formulaire
    this.addArtForm.reset();
  }

  submitModArticle(id: number, type: string) {
    // disable the check button
    this.poppedModif[id] = false;
    const idButton = 'modif' + type + id.toString();
    const button = document.getElementById(idButton) as HTMLInputElement;
    button.checked = false;

    this.modifArticle(id, this.modVal.prix.value, this.modVal.chaine.value, this.modVal.affichage.value);

    // empty the value of input text
    this.modArtForm.reset();
  }

  addToCart(article: Article) {
    this.cartService.addToCart(article);
    this.info = 'Ajouté au panier !';
    setTimeout(function() {
      this.this.info = null;
    }, 5000);
  }

  popBoite() {
    this.displayBoite = !this.displayBoite;
  }

  updateAff(art: Article) {
    let aff: number;
    if (art.Affichage === 0) {
      aff = 1;
    } else {
      aff = 0;
    }
    this.modifArticle(art.NumArt, null, null, aff);
  }
}
