import {Component, OnInit} from '@angular/core';
import {Commande} from '../commande';
import {CommandeListService} from './commande-list.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[];
  error = '';
  ok = '';
  info = '';

  constructor(
    private commandeListService: CommandeListService
  ) {
  }

  ngOnInit(): void {
    this.getCmdList(); // fonction qui remplit le tableau de commandes
  }

  getCmdList() {
    this.commandeListService.getCommandes()
      .subscribe(
        commande => {
          this.commandes = commande;
          if (!commande) {
            this.info = 'Aucune commande n\'est disponible';
          }
        },
        err => {
          this.error = err;
        }
      );
  }

  delCmd(idCmd: number) {
    this.commandeListService.delCommande(idCmd)
      .subscribe(deleted => {
        if (deleted.affectedRows === 1) {
          this.getCmdList();
          this.ok = 'Suppression réussi';
          this.info = null;
          this.error = null;
        } else {
          this.ok = null;
          this.error = null;
        }
      });
  }
}
