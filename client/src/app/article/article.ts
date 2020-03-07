export class Article {
  NumArt?: number; // optionnel pour pouvoir envoyer un article en laissant le back gerer l'identifiant
  Prix: number;
  Type: string;
  Affichage?: number; // optionnel pour ajout de boite par avec decoded.admin et donc pas besoin de le fournir par le client
  typeChoco?: string;
  description?: string;
  quantite?: number;
  noisette?: number;
  alcool?: number;
  blanc?: number;
  noir?: number;
  // tslint:disable-next-line:variable-name
  au_lait?: number;
  praline?: number;
}
