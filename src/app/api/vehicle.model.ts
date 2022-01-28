import * as dayjs from 'dayjs';
import { IMake } from './make.model';
import { ILegalEntity } from './legal-entity.model';
import { IModel } from './model.model';

export interface IVehicle {
  id?: number;
  plateNumber?: string;
  firstRegistrationDate?: dayjs.Dayjs;
  used?: boolean;
  mileage?: number;
  mileageUnit?: string;
  fuelType?: string;
  vin?: string | null;
  make?: IMake | null;
  model?: IModel | null;
  owner?: ILegalEntity | null;
}

export class Vehicle implements IVehicle {
  constructor(
    public id?: number,
    public plateNumber?: string,
    public firstRegistrationDate?: dayjs.Dayjs,
    public used?: boolean,
    public mileage?: number,
    public mileageUnit?: string,
    public fuelType?: string,
    public vin?: string | null,
    public make?: IMake | null,
    public model?: IModel | null,
    public owner?: ILegalEntity | null
  ) {
    this.used = this.used ?? false;
  }
}

export interface VehicleSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  regNumber?: string;
  minPrice?: string;
  maxPrice?: string;
}

export function getVehicleIdentifier(vehicle: IVehicle): number | undefined {
  return vehicle.id;
}
