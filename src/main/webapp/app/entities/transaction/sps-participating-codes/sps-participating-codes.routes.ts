import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SPSParticipatingCodesResolve from './route/sps-participating-codes-routing-resolve.service';

const sPSParticipatingCodesRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/sps-participating-codes.component').then(m => m.SPSParticipatingCodesComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/sps-participating-codes-detail.component').then(m => m.SPSParticipatingCodesDetailComponent),
    resolve: {
      sPSParticipatingCodes: SPSParticipatingCodesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/sps-participating-codes-update.component').then(m => m.SPSParticipatingCodesUpdateComponent),
    resolve: {
      sPSParticipatingCodes: SPSParticipatingCodesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/sps-participating-codes-update.component').then(m => m.SPSParticipatingCodesUpdateComponent),
    resolve: {
      sPSParticipatingCodes: SPSParticipatingCodesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default sPSParticipatingCodesRoute;
