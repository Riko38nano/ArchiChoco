import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {mdpMatchValidator} from './mdpMatchValidator';
import {InscriptionService} from './inscription.service';
import {Compte} from '../Compte';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  compte: Compte;

  profileForm = new FormGroup({
    mail: new FormControl(''),
    mdp1: new FormControl(''),
    mdp2: new FormControl(''),
    nom: new FormControl(''),
    pnom: new FormControl(''),
    rue: new FormControl(''),
    cp: new FormControl(''),
    ville: new FormControl('')

  }, {validators: mdpMatchValidator});

  get f() {
    return this.profileForm.controls;
  }

  constructor(private inscriptionService: InscriptionService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const mail = this.f.mail.value;
    const mdp = this.f.mdp2.value;
    const nom = this.f.nom.value;
    const pnom = this.f.pnom.value;
    const rue = this.f.rue.value;
    const cp = parseInt(this.f.cp.value, 0);
    const ville = this.f.ville.value;

    this.addClient(mail, mdp, nom, pnom, rue, cp, ville);
  }

  addClient(mailCli: string, mdpCli: string, NomCli: string, PnomCli: string, RueCli: string, CPCli: number, VilleCli: string) {
    this.inscriptionService.addClient({mailCli, NomCli, PnomCli, RueCli, CPCli, VilleCli, mdpCli})
      .subscribe(client => {
        // TODO Ajouter un handleError et afficher
      });
  }
}
