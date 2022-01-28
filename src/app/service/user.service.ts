import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { getUserIdentifier, IUser } from '../api/user.model';
import { createRequestOption } from '../core/request/request-util';
import { isPresent } from '../core/util/operators';
import { Pagination } from '../core/request/request.model';



@Injectable({ providedIn: 'root' })
export class UserService {
    private adminUserResourceUrl = this.applicationConfigService.getEndpointFor('api/users');
    private userResourceUrl = this.applicationConfigService.getEndpointFor('api/user');

    constructor(private httpclient: HttpClient, private applicationConfigService: ApplicationConfigService) { }

    query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.httpclient.get<IUser[]>(this.adminUserResourceUrl, { params: options, observe: 'response' });
    }

    getUser(login: string, req?: Pagination): Observable<HttpResponse<IUser>> {
        const options = createRequestOption(req);
        return this.httpclient.get<IUser>(`${this.adminUserResourceUrl}/${login}`, { params: options, observe: 'response' });
    }

    getUserByLogin(login: string): Observable<IUser> {
        return this.httpclient.get<IUser>(`${this.userResourceUrl}/${login}`);
    }

    addUserToCollectionIfMissing(userCollection: IUser[], ...usersToCheck: (IUser | null | undefined)[]): IUser[] {
        const users: IUser[] = usersToCheck.filter(isPresent);
        if (users.length > 0) {
            const userCollectionIdentifiers = userCollection.map(userItem => getUserIdentifier(userItem)!);
            const usersToAdd = users.filter(userItem => {
                const userIdentifier = getUserIdentifier(userItem);
                if (userIdentifier == null || userCollectionIdentifiers.includes(userIdentifier)) {
                    return false;
                }
                userCollectionIdentifiers.push(userIdentifier);
                return true;
            });
            return [...usersToAdd, ...userCollection];
        }
        return userCollection;
    }
}
