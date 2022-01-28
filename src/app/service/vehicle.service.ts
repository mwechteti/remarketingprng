import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { IVehicle, VehicleSearchParams, getVehicleIdentifier, Vehicle } from '../api/vehicle.model';
import { createRequestOption } from '../core/request/request-util';
import { isPresent } from '../core/util/operators';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { DATE_FORMAT } from '../config/input.constants';




export type EntityResponseType = HttpResponse<IVehicle>;
export type EntityArrayResponseType = HttpResponse<IVehicle[]>;

export abstract class VehicleService {
  abstract getAll(): Observable<IVehicle[]>;
  abstract getById(vehicleId: number): Observable<IVehicle>;
  abstract search(params: VehicleSearchParams): Observable<IVehicle[]>;
}


@Injectable({ providedIn: 'root' })
export class HttpVehicleService implements VehicleService {

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vehicles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }
  getVehicless() {
    return this.http.get<any>('assets/demo/data/vehicles.json')
      .toPromise()
      .then(res => res.data as Vehicle[])
      .then(data => data);
  }
  create(vehicle: IVehicle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicle);
    return this.http
      .post<IVehicle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vehicle: IVehicle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicle);
    return this.http
      .put<IVehicle>(`${this.resourceUrl}/${getVehicleIdentifier(vehicle) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(vehicle: IVehicle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicle);
    return this.http
      .patch<IVehicle>(`${this.resourceUrl}/${getVehicleIdentifier(vehicle) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVehicle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getAll(): Observable<IVehicle[]> {
    return this.http
      .get<IVehicle[]>(`${this.resourceUrl}`);
  }

  getById(vehicleId: number): Observable<IVehicle> {
    return this.http
      .get<IVehicle>(`${this.resourceUrl}/${vehicleId}`);
  }

  search(params: VehicleSearchParams): Observable<IVehicle[]> {
    return this.http
      .get<IVehicle[]>(`${this.resourceUrl}`, { params });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVehicle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVehicleToCollectionIfMissing(vehicleCollection: IVehicle[], ...vehiclesToCheck: (IVehicle | null | undefined)[]): IVehicle[] {
    const vehicles: IVehicle[] = vehiclesToCheck.filter(isPresent);
    if (vehicles.length > 0) {
      const vehicleCollectionIdentifiers = vehicleCollection.map(vehicleItem => getVehicleIdentifier(vehicleItem)!);
      const vehiclesToAdd = vehicles.filter(vehicleItem => {
        const vehicleIdentifier = getVehicleIdentifier(vehicleItem);
        if (vehicleIdentifier == null || vehicleCollectionIdentifiers.includes(vehicleIdentifier)) {
          return false;
        }
        vehicleCollectionIdentifiers.push(vehicleIdentifier);
        return true;
      });
      return [...vehiclesToAdd, ...vehicleCollection];
    }
    return vehicleCollection;
  }

  protected convertDateFromClient(vehicle: IVehicle): IVehicle {
    return Object.assign({}, vehicle, {
      firstRegistrationDate: vehicle.firstRegistrationDate?.isValid() ? vehicle.firstRegistrationDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.firstRegistrationDate = res.body.firstRegistrationDate ? dayjs(res.body.firstRegistrationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vehicle: IVehicle) => {
        vehicle.firstRegistrationDate = vehicle.firstRegistrationDate ? dayjs(vehicle.firstRegistrationDate) : undefined;
      });
    }
    return res;
  }
}
