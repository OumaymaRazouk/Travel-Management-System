export class Travel {
  idVoyage?: number;  // Id voyage (optionnel pour la création)
  destination: string;
  dateDepart: string;
  dateRetour: string;
  prix: number;
  nombrePlaces: number;
  description: string;
  imageUrl: string;
  promotion?: any; // Référence à la promotion

  constructor(destination: string = '', dateDepart: string = '', dateRetour: string = '', prix: number = 0, nombrePlaces: number = 0, description: string ='', imageUrl: string ='', promotion: any = null) {
    this.destination = destination;
    this.dateDepart = dateDepart;
    this.dateRetour = dateRetour;
    this.prix = prix;
    this.nombrePlaces = nombrePlaces;
    this.description = description;
    this.imageUrl = imageUrl;
    this.promotion = promotion;
  }
}
