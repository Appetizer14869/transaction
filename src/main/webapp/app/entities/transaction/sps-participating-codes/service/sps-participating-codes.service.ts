import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISPSParticipatingCodes, NewSPSParticipatingCodes } from '../sps-participating-codes.model';

export type PartialUpdateSPSParticipatingCodes = Partial<ISPSParticipatingCodes> & Pick<ISPSParticipatingCodes, 'id'>;

export type EntityResponseType = HttpResponse<ISPSParticipatingCodes>;
export type EntityArrayResponseType = HttpResponse<ISPSParticipatingCodes[]>;

@Injectable({ providedIn: 'root' })
export class SPSParticipatingCodesService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sps-participating-codes', 'transaction');

  create(sPSParticipatingCodes: NewSPSParticipatingCodes): Observable<EntityResponseType> {
    return this.http.post<ISPSParticipatingCodes>(this.resourceUrl, sPSParticipatingCodes, { observe: 'response' });
  }

  update(sPSParticipatingCodes: ISPSParticipatingCodes): Observable<EntityResponseType> {
    return this.http.put<ISPSParticipatingCodes>(
      `${this.resourceUrl}/${this.getSPSParticipatingCodesIdentifier(sPSParticipatingCodes)}`,
      sPSParticipatingCodes,
      { observe: 'response' },
    );
  }

  partialUpdate(sPSParticipatingCodes: PartialUpdateSPSParticipatingCodes): Observable<EntityResponseType> {
    return this.http.patch<ISPSParticipatingCodes>(
      `${this.resourceUrl}/${this.getSPSParticipatingCodesIdentifier(sPSParticipatingCodes)}`,
      sPSParticipatingCodes,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISPSParticipatingCodes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISPSParticipatingCodes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSPSParticipatingCodesIdentifier(sPSParticipatingCodes: Pick<ISPSParticipatingCodes, 'id'>): number {
    return sPSParticipatingCodes.id;
  }

  compareSPSParticipatingCodes(o1: Pick<ISPSParticipatingCodes, 'id'> | null, o2: Pick<ISPSParticipatingCodes, 'id'> | null): boolean {
    return o1 && o2 ? this.getSPSParticipatingCodesIdentifier(o1) === this.getSPSParticipatingCodesIdentifier(o2) : o1 === o2;
  }

  addSPSParticipatingCodesToCollectionIfMissing<Type extends Pick<ISPSParticipatingCodes, 'id'>>(
    sPSParticipatingCodesCollection: Type[],
    ...sPSParticipatingCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sPSParticipatingCodes: Type[] = sPSParticipatingCodesToCheck.filter(isPresent);
    if (sPSParticipatingCodes.length > 0) {
      const sPSParticipatingCodesCollectionIdentifiers = sPSParticipatingCodesCollection.map(sPSParticipatingCodesItem =>
        this.getSPSParticipatingCodesIdentifier(sPSParticipatingCodesItem),
      );
      const sPSParticipatingCodesToAdd = sPSParticipatingCodes.filter(sPSParticipatingCodesItem => {
        const sPSParticipatingCodesIdentifier = this.getSPSParticipatingCodesIdentifier(sPSParticipatingCodesItem);
        if (sPSParticipatingCodesCollectionIdentifiers.includes(sPSParticipatingCodesIdentifier)) {
          return false;
        }
        sPSParticipatingCodesCollectionIdentifiers.push(sPSParticipatingCodesIdentifier);
        return true;
      });
      return [...sPSParticipatingCodesToAdd, ...sPSParticipatingCodesCollection];
    }
    return sPSParticipatingCodesCollection;
  }
}
