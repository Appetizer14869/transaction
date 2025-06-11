import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICBSTransactions } from '../cbs-transactions.model';
import { CBSTransactionsService } from '../service/cbs-transactions.service';

const cBSTransactionsResolve = (route: ActivatedRouteSnapshot): Observable<null | ICBSTransactions> => {
  const id = route.params.id;
  if (id) {
    return inject(CBSTransactionsService)
      .find(id)
      .pipe(
        mergeMap((cBSTransactions: HttpResponse<ICBSTransactions>) => {
          if (cBSTransactions.body) {
            return of(cBSTransactions.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default cBSTransactionsResolve;
