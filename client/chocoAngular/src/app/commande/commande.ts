import {Article} from '../article/article';

export class Commande {
  NumCmd: number;
  NomCli: string;
  PnomCli: string;
  Consigne: string;
  Date: any;
  Livraison: number;
  RueCli?: string;
  CPCli?: number;
  VilleCli?: string;
  artList: Article[];
  prixTot: number;
}
