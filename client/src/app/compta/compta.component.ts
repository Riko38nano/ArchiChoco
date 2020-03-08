import { Component, OnInit } from '@angular/core';
import {ComptaService} from './compta.service';

@Component({
  selector: 'app-compta',
  templateUrl: './compta.component.html',
  styleUrls: ['./compta.component.scss']
})
export class ComptaComponent implements OnInit {

  benef: number;
  count: number;

  error: string;

  constructor(private comptaService: ComptaService) { }

  ngOnInit(): void {
    this.getCompta();
  }

  getCompta() {
    this.comptaService.getCompta().subscribe(
      next => {
        this.benef = next[0].benef; // la somme des prix totaux de la table d'archive
        this.count = next[0].count; // la somme des commandes réalisé
      },
      err => this.error = err
    );
  }

}
