import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SPSIncomingTransactionsResolve from './route/sps-incoming-transactions-routing-resolve.service';

const sPSIncomingTransactionsRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/sps-incoming-transactions.component').then(m => m.SPSIncomingTransactionsComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/sps-incoming-transactions-detail.component').then(m => m.SPSIncomingTransactionsDetailComponent),
    resolve: {
      sPSIncomingTransactions: SPSIncomingTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/sps-incoming-transactions-update.component').then(m => m.SPSIncomingTransactionsUpdateComponent),
    resolve: {
      sPSIncomingTransactions: SPSIncomingTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/sps-incoming-transactions-update.component').then(m => m.SPSIncomingTransactionsUpdateComponent),
    resolve: {
      sPSIncomingTransactions: SPSIncomingTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default sPSIncomingTransactionsRoute;
