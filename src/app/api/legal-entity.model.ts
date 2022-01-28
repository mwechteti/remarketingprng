import { IAddress } from "./address.model";
import { ILegalEntityType } from "./legal-entity-type.model";
import { IVehicle } from "./vehicle.model";


export interface ILegalEntity {
  id?: number;
  name?: string;
  type?: ILegalEntityType | null;
  vehicles?: IVehicle[] | null;
  addresses?: IAddress[] | null;
}

export class LegalEntity implements ILegalEntity {
  constructor(
    public id?: number,
    public name?: string,
    public type?: ILegalEntityType | null,
    public vehicles?: IVehicle[] | null,
    public addresses?: IAddress[] | null
  ) { }
}

export function getLegalEntityIdentifier(legalEntity: ILegalEntity): number | undefined {
  return legalEntity.id;
}
