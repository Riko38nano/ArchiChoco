import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './compte/auth/auth.component';
import { InscriptionComponent } from './compte/inscription/inscription.component';

import { ArticleListComponent } from './article/article-list/article-list.component';
import {CommandeListComponent} from './commande/commande-list/commande-list.component';
import {ComptaComponent} from './compta/compta.component';

import { CartComponent } from './article/cart/cart.component';

import {AuthGuard} from './compte/auth/guard/auth.guard';
import {AdminGuard} from './compte/auth/guard/admin.guard';

const routes: Routes = [
  { path: 'Connexion', component: AuthComponent},
  { path: 'Inscription', component: InscriptionComponent},

  { path: 'Accueil', component: ArticleListComponent, canActivate: [AuthGuard]},

  { path: 'Commandes', component: CommandeListComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'Comptabilité', component: ComptaComponent, canActivate: [AuthGuard, AdminGuard]},

  { path: 'Panier', component: CartComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'Connexion'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
