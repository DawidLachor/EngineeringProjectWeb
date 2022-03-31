export interface EditAnnouncement {
  id: number;
  idCar: number;
  bodyType: number;
  brand: number;
  model: number
  generation: number;
  capacity: string;
  color: string;
  country_of_production: string;
  crash: boolean;
  describe: string;
  doors: number;
  first_registration: Date;
  gas: number;
  location: string;
  mileage: number;
  phone: string;
  power: number;
  price: string;
  registration_number: string;
  seats: number;
  title: string;
  transmission: number;
  vin: string;
  year_of_production: Date;
}
