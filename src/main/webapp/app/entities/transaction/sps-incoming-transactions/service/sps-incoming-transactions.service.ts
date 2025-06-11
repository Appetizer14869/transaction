import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISPSIncomingTransactions, NewSPSIncomingTransactions } from '../sps-incoming-transactions.model';

export type PartialUpdateSPSIncomingTransactions = Partial<ISPSIncomingTransactions> & Pick<ISPSIncomingTransactions, 'id'>;

type RestOf<T extends ISPSIncomingTransactions | NewSPSIncomingTransactions> = Omit<T, 'requestInstanttime'> & {
  requestInstanttime?: string | null;
};

export type RestSPSIncomingTransactions = RestOf<ISPSIncomingTransactions>;

export type NewRestSPSIncomingTransactions = RestOf<NewSPSIncomingTransactions>;

export type PartialUpdateRestSPSIncomingTransactions = RestOf<PartialUpdateSPSIncomingTransactions>;

export type EntityResponseType = HttpResponse<ISPSIncomingTransactions>;
export type EntityArrayResponseType = HttpResponse<ISPSIncomingTransactions[]>;

@Injectable({ providedIn: 'root' })
export class SPSIncomingTransactionsService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sps-incoming-transactions', 'transaction');

  create(sPSIncomingTransactions: NewSPSIncomingTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sPSIncomingTransactions);
    return this.http
      .post<RestSPSIncomingTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(sPSIncomingTransactions: ISPSIncomingTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sPSIncomingTransactions);
    return this.http
      .put<RestSPSIncomingTransactions>(`${this.resourceUrl}/${this.getSPSIncomingTransactionsIdentifier(sPSIncomingTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(sPSIncomingTransactions: PartialUpdateSPSIncomingTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sPSIncomingTransactions);
    return this.http
      .patch<RestSPSIncomingTransactions>(
        `${this.resourceUrl}/${this.getSPSIncomingTransactionsIdentifier(sPSIncomingTransactions)}`,
        copy,
        { observe: 'response' },
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSPSIncomingTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSPSIncomingTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSPSIncomingTransactionsIdentifier(sPSIncomingTransactions: Pick<ISPSIncomingTransactions, 'id'>): number {
    return sPSIncomingTransactions.id;
  }

  compareSPSIncomingTransactions(
    o1: Pick<ISPSIncomingTransactions, 'id'> | null,
    o2: Pick<ISPSIncomingTransactions, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getSPSIncomingTransactionsIdentifier(o1) === this.getSPSIncomingTransactionsIdentifier(o2) : o1 === o2;
  }

  addSPSIncomingTransactionsToCollectionIfMissing<Type extends Pick<ISPSIncomingTransactions, 'id'>>(
    sPSIncomingTransactionsCollection: Type[],
    ...sPSIncomingTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sPSIncomingTransactions: Type[] = sPSIncomingTransactionsToCheck.filter(isPresent);
    if (sPSIncomingTransactions.length > 0) {
      const sPSIncomingTransactionsCollectionIdentifiers = sPSIncomingTransactionsCollection.map(sPSIncomingTransactionsItem =>
        this.getSPSIncomingTransactionsIdentifier(sPSIncomingTransactionsItem),
      );
      const sPSIncomingTransactionsToAdd = sPSIncomingTransactions.filter(sPSIncomingTransactionsItem => {
        const sPSIncomingTransactionsIdentifier = this.getSPSIncomingTransactionsIdentifier(sPSIncomingTransactionsItem);
        if (sPSIncomingTransactionsCollectionIdentifiers.includes(sPSIncomingTransactionsIdentifier)) {
          return false;
        }
        sPSIncomingTransactionsCollectionIdentifiers.push(sPSIncomingTransactionsIdentifier);
        return true;
      });
      return [...sPSIncomingTransactionsToAdd, ...sPSIncomingTransactionsCollection];
    }
    return sPSIncomingTransactionsCollection;
  }

  protected convertDateFromClient<T extends ISPSIncomingTransactions | NewSPSIncomingTransactions | PartialUpdateSPSIncomingTransactions>(
    sPSIncomingTransactions: T,
  ): RestOf<T> {
    return {
      ...sPSIncomingTransactions,
      requestInstanttime: sPSIncomingTransactions.requestInstanttime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSPSIncomingTransactions: RestSPSIncomingTransactions): ISPSIncomingTransactions {
    return {
      ...restSPSIncomingTransactions,
      requestInstanttime: restSPSIncomingTransactions.requestInstanttime
        ? dayjs(restSPSIncomingTransactions.requestInstanttime)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSPSIncomingTransactions>): HttpResponse<ISPSIncomingTransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSPSIncomingTransactions[]>): HttpResponse<ISPSIncomingTransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
