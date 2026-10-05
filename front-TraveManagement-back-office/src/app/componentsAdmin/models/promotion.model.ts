export interface Promotion {
  id?: number;
  titre: string;
  description: string;
  pourcentage: number;
  typePromotion: 'TRAVEL' | 'RESERVATION';
}
