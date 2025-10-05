export interface IPickUpPoint {
  id: string;
  name: string;
  deliveryMethodId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: string;
}
