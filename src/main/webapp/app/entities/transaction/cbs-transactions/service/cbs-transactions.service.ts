import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICBSTransactions, NewCBSTransactions } from '../cbs-transactions.model';

export type PartialUpdateCBSTransactions = Partial<ICBSTransactions> & Pick<ICBSTransactions, 'id'>;

type RestOf<T extends ICBSTransactions | NewCBSTransactions> = Omit<T, 'requestInstanttime'> & {
  requestInstanttime?: string | null;
};

export type RestCBSTransactions = RestOf<ICBSTransactions>;

export type NewRestCBSTransactions = RestOf<NewCBSTransactions>;

export type PartialUpdateRestCBSTransactions = RestOf<PartialUpdateCBSTransactions>;

export type EntityResponseType = HttpResponse<ICBSTransactions>;
export type EntityArrayResponseType = HttpResponse<ICBSTransactions[]>;

@Injectable({ providedIn: 'root' })
export class CBSTransactionsService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cbs-transactions', 'transaction');

  create(cBSTransactions: NewCBSTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cBSTransactions);
    return this.http
      .post<RestCBSTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cBSTransactions: ICBSTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cBSTransactions);
    return this.http
      .put<RestCBSTransactions>(`${this.resourceUrl}/${this.getCBSTransactionsIdentifier(cBSTransactions)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cBSTransactions: PartialUpdateCBSTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cBSTransactions);
    return this.http
      .patch<RestCBSTransactions>(`${this.resourceUrl}/${this.getCBSTransactionsIdentifier(cBSTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCBSTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCBSTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCBSTransactionsIdentifier(cBSTransactions: Pick<ICBSTransactions, 'id'>): number {
    return cBSTransactions.id;
  }

  compareCBSTransactions(o1: Pick<ICBSTransactions, 'id'> | null, o2: Pick<ICBSTransactions, 'id'> | null): boolean {
    return o1 && o2 ? this.getCBSTransactionsIdentifier(o1) === this.getCBSTransactionsIdentifier(o2) : o1 === o2;
  }

  addCBSTransactionsToCollectionIfMissing<Type extends Pick<ICBSTransactions, 'id'>>(
    cBSTransactionsCollection: Type[],
    ...cBSTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cBSTransactions: Type[] = cBSTransactionsToCheck.filter(isPresent);
    if (cBSTransactions.length > 0) {
      const cBSTransactionsCollectionIdentifiers = cBSTransactionsCollection.map(cBSTransactionsItem =>
        this.getCBSTransactionsIdentifier(cBSTransactionsItem),
      );
      const cBSTransactionsToAdd = cBSTransactions.filter(cBSTransactionsItem => {
        const cBSTransactionsIdentifier = this.getCBSTransactionsIdentifier(cBSTransactionsItem);
        if (cBSTransactionsCollectionIdentifiers.includes(cBSTransactionsIdentifier)) {
          return false;
        }
        cBSTransactionsCollectionIdentifiers.push(cBSTransactionsIdentifier);
        return true;
      });
      return [...cBSTransactionsToAdd, ...cBSTransactionsCollection];
    }
    return cBSTransactionsCollection;
  }

  protected convertDateFromClient<T extends ICBSTransactions | NewCBSTransactions | PartialUpdateCBSTransactions>(
    cBSTransactions: T,
  ): RestOf<T> {
    return {
      ...cBSTransactions,
      requestInstanttime: cBSTransactions.requestInstanttime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCBSTransactions: RestCBSTransactions): ICBSTransactions {
    return {
      ...restCBSTransactions,
      requestInstanttime: restCBSTransactions.requestInstanttime ? dayjs(restCBSTransactions.requestInstanttime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCBSTransactions>): HttpResponse<ICBSTransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCBSTransactions[]>): HttpResponse<ICBSTransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
