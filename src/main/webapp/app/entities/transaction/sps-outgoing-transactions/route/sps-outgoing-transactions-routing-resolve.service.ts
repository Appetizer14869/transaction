import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISPSOutgoingTransactions } from '../sps-outgoing-transactions.model';
import { SPSOutgoingTransactionsService } from '../service/sps-outgoing-transactions.service';

const sPSOutgoingTransactionsResolve = (route: ActivatedRouteSnapshot): Observable<null | ISPSOutgoingTransactions> => {
  const id = route.params.id;
  if (id) {
    return inject(SPSOutgoingTransactionsService)
      .find(id)
      .pipe(
        mergeMap((sPSOutgoingTransactions: HttpResponse<ISPSOutgoingTransactions>) => {
          if (sPSOutgoingTransactions.body) {
            return of(sPSOutgoingTransactions.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default sPSOutgoingTransactionsResolve;
