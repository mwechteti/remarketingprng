import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IModel, getModelIdentifier } from '../api/model.model';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { isPresent } from '../core/util/operators';
import { createRequestOption } from '../core/request/request-util';



export type EntityResponseType = HttpResponse<IModel>;
export type EntityArrayResponseType = HttpResponse<IModel[]>;

@Injectable({ providedIn: 'root' })
export class ModelService {
    protected resourceUrl = this.applicationConfigService.getEndpointFor('api/models');

    constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }

    create(model: IModel): Observable<EntityResponseType> {
        return this.http.post<IModel>(this.resourceUrl, model, { observe: 'response' });
    }

    update(model: IModel): Observable<EntityResponseType> {
        return this.http.put<IModel>(`${this.resourceUrl}/${getModelIdentifier(model) as number}`, model, { observe: 'response' });
    }

    partialUpdate(model: IModel): Observable<EntityResponseType> {
        return this.http.patch<IModel>(`${this.resourceUrl}/${getModelIdentifier(model) as number}`, model, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IModel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    addModelToCollectionIfMissing(modelCollection: IModel[], ...modelsToCheck: (IModel | null | undefined)[]): IModel[] {
        const models: IModel[] = modelsToCheck.filter(isPresent);
        if (models.length > 0) {
            const modelCollectionIdentifiers = modelCollection.map(modelItem => getModelIdentifier(modelItem)!);
            const modelsToAdd = models.filter(modelItem => {
                const modelIdentifier = getModelIdentifier(modelItem);
                if (modelIdentifier == null || modelCollectionIdentifiers.includes(modelIdentifier)) {
                    return false;
                }
                modelCollectionIdentifiers.push(modelIdentifier);
                return true;
            });
            return [...modelsToAdd, ...modelCollection];
        }
        return modelCollection;
    }
}
