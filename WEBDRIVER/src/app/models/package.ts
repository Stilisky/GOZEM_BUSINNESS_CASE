export class Package {
  package_id: string;
  active_delivery_id?: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location: { lat: number, lng: number };
  to_name: string;
  to_address: string;
  to_location: { lat: number, lng: number };

  constructor(
    package_id: string,
    description: string,
    weight: number,
    width: number,
    height: number,
    depth: number,
    from_name: string,
    from_address: string,
    from_location: { lat: number, lng: number },
    to_name: string,
    to_address: string,
    to_location: { lat: number, lng: number },
    active_delivery_id?: string
  ) {
    this.package_id = package_id;
    this.description = description;
    this.weight = weight;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.from_name = from_name;
    this.from_address = from_address;
    this.from_location = from_location;
    this.to_name = to_name;
    this.to_address = to_address;
    this.to_location = to_location;
    this.active_delivery_id = active_delivery_id;
  }
}
