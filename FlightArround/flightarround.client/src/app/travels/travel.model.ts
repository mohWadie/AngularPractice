import { Time } from '@angular/common';

export interface Travel {
  id: string | null;
  fromId: string;
  toId: string;
  fromCity: string | null;
  toCity: string | null;
  fromCountry: string | null;
  toCountry: string | null;
  travelDate: string;
  travelTime: string;
  arriveTime: string;
  availableSeats: number;
  price: number;
}
