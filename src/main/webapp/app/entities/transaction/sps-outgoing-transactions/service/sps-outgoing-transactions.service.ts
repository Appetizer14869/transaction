import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISPSOutgoingTransactions, NewSPSOutgoingTransactions } from '../sps-outgoing-transactions.model';

export type PartialUpdateSPSOutgoingTransactions = Partial<ISPSOutgoingTransactions> & Pick<ISPSOutgoingTransactions, 'id'>;

type RestOf<T extends ISPSOutgoingTransactions | NewSPSOutgoingTransactions> = Omit<T, 'requestInstanttime'> & {
  requestInstanttime?: string | null;
};

export type RestSPSOutgoingTransactions = RestOf<ISPSOutgoingTransactions>;

export type NewRestSPSOutgoingTransactions = RestOf<NewSPSOutgoingTransactions>;

export type PartialUpdateRestSPSOutgoingTransactions = RestOf<PartialUpdateSPSOutgoingTransactions>;

export type EntityResponseType = HttpResponse<ISPSOutgoingTransactions>;
export type EntityArrayResponseType = HttpResponse<ISPSOutgoingTransactions[]>;

@Injectable({ providedIn: 'root' })
export class SPSOutgoingTransactionsService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sps-outgoing-transactions', 'transaction');

  create(sPSOutgoingTransactions: NewSPSOutgoingTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sPSOutgoingTransactions);
    return this.http
      .post<RestSPSOutgoingTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(sPSOutgoingTransactions: ISPSOutgoingTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sPSOutgoingTransactions);
    return this.http
      .put<RestSPSOutgoingTransactions>(`${this.resourceUrl}/${this.getSPSOutgoingTransactionsIdentifier(sPSOutgoingTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(sPSOutgoingTransactions: PartialUpdateSPSOutgoingTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sPSOutgoingTransactions);
    return this.http
      .patch<RestSPSOutgoingTransactions>(
        `${this.resourceUrl}/${this.getSPSOutgoingTransactionsIdentifier(sPSOutgoingTransactions)}`,
        copy,
        { observe: 'response' },
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSPSOutgoingTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSPSOutgoingTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSPSOutgoingTransactionsIdentifier(sPSOutgoingTransactions: Pick<ISPSOutgoingTransactions, 'id'>): number {
    return sPSOutgoingTransactions.id;
  }

  compareSPSOutgoingTransactions(
    o1: Pick<ISPSOutgoingTransactions, 'id'> | null,
    o2: Pick<ISPSOutgoingTransactions, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getSPSOutgoingTransactionsIdentifier(o1) === this.getSPSOutgoingTransactionsIdentifier(o2) : o1 === o2;
  }

  addSPSOutgoingTransactionsToCollectionIfMissing<Type extends Pick<ISPSOutgoingTransactions, 'id'>>(
    sPSOutgoingTransactionsCollection: Type[],
    ...sPSOutgoingTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sPSOutgoingTransactions: Type[] = sPSOutgoingTransactionsToCheck.filter(isPresent);
    if (sPSOutgoingTransactions.length > 0) {
      const sPSOutgoingTransactionsCollectionIdentifiers = sPSOutgoingTransactionsCollection.map(sPSOutgoingTransactionsItem =>
        this.getSPSOutgoingTransactionsIdentifier(sPSOutgoingTransactionsItem),
      );
      const sPSOutgoingTransactionsToAdd = sPSOutgoingTransactions.filter(sPSOutgoingTransactionsItem => {
        const sPSOutgoingTransactionsIdentifier = this.getSPSOutgoingTransactionsIdentifier(sPSOutgoingTransactionsItem);
        if (sPSOutgoingTransactionsCollectionIdentifiers.includes(sPSOutgoingTransactionsIdentifier)) {
          return false;
        }
        sPSOutgoingTransactionsCollectionIdentifiers.push(sPSOutgoingTransactionsIdentifier);
        return true;
      });
      return [...sPSOutgoingTransactionsToAdd, ...sPSOutgoingTransactionsCollection];
    }
    return sPSOutgoingTransactionsCollection;
  }

  protected convertDateFromClient<T extends ISPSOutgoingTransactions | NewSPSOutgoingTransactions | PartialUpdateSPSOutgoingTransactions>(
    sPSOutgoingTransactions: T,
  ): RestOf<T> {
    return {
      ...sPSOutgoingTransactions,
      requestInstanttime: sPSOutgoingTransactions.requestInstanttime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSPSOutgoingTransactions: RestSPSOutgoingTransactions): ISPSOutgoingTransactions {
    return {
      ...restSPSOutgoingTransactions,
      requestInstanttime: restSPSOutgoingTransactions.requestInstanttime
        ? dayjs(restSPSOutgoingTransactions.requestInstanttime)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSPSOutgoingTransactions>): HttpResponse<ISPSOutgoingTransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSPSOutgoingTransactions[]>): HttpResponse<ISPSOutgoingTransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
