export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Travel {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  description: string;
  // Ajoutez d'autres propriétés selon vos besoins
}

export interface Reservation {
  id?: number;
  userId: number;
  travelId: number;
  user?: User;
  travel?: Travel;
}

export interface ReservationRequest {
  userId: number;
  travelId: number;
}
