import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISPSIncomingTransactions } from '../sps-incoming-transactions.model';
import { SPSIncomingTransactionsService } from '../service/sps-incoming-transactions.service';

const sPSIncomingTransactionsResolve = (route: ActivatedRouteSnapshot): Observable<null | ISPSIncomingTransactions> => {
  const id = route.params.id;
  if (id) {
    return inject(SPSIncomingTransactionsService)
      .find(id)
      .pipe(
        mergeMap((sPSIncomingTransactions: HttpResponse<ISPSIncomingTransactions>) => {
          if (sPSIncomingTransactions.body) {
            return of(sPSIncomingTransactions.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default sPSIncomingTransactionsResolve;
