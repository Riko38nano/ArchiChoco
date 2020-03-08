import {Article} from '../article/article';

// objet que l'on reçoit dans la page des commandes
export class Commande {
  NumCmd: number;
  NomCli: string;
  PnomCli: string;
  Consigne: string;
  Date: any;
  Livraison: number;
  RueCli?: string; // attribut optionnels si le client ne veut pas se faire livré
  CPCli?: number;
  VilleCli?: string;
  artList: Article[];
  prixTot: number;
}
