import { Package } from "./package";

export class Delivery {
  delivery_id: string;
  package_id: Package;
  pickup_time?: Date;
  start_time?: Date;
  end_time?: Date;
  location: { lat: number, lng: number };
  status: 'open' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';


  constructor(
    delivery_id: string,
    package_id: Package,
    location: { lat: number; lng: number },
    status: 'open' | 'picked-up' | 'in-transit' | 'delivered' | 'failed' = 'open',
    pickup_time?: Date,
    start_time?: Date,
    end_time?: Date,
  ) {
    this.delivery_id = delivery_id
    this.package_id = package_id;
    this.pickup_time = pickup_time;
    this.end_time = end_time,
    this.start_time = start_time,
    this.location = location;
    this.status = status;
  }
}
