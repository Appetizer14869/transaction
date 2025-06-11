import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISPSParticipatingCodes } from '../sps-participating-codes.model';
import { SPSParticipatingCodesService } from '../service/sps-participating-codes.service';

const sPSParticipatingCodesResolve = (route: ActivatedRouteSnapshot): Observable<null | ISPSParticipatingCodes> => {
  const id = route.params.id;
  if (id) {
    return inject(SPSParticipatingCodesService)
      .find(id)
      .pipe(
        mergeMap((sPSParticipatingCodes: HttpResponse<ISPSParticipatingCodes>) => {
          if (sPSParticipatingCodes.body) {
            return of(sPSParticipatingCodes.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default sPSParticipatingCodesResolve;
