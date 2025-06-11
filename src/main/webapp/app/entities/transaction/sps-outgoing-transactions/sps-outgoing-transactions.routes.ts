import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SPSOutgoingTransactionsResolve from './route/sps-outgoing-transactions-routing-resolve.service';

const sPSOutgoingTransactionsRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/sps-outgoing-transactions.component').then(m => m.SPSOutgoingTransactionsComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/sps-outgoing-transactions-detail.component').then(m => m.SPSOutgoingTransactionsDetailComponent),
    resolve: {
      sPSOutgoingTransactions: SPSOutgoingTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/sps-outgoing-transactions-update.component').then(m => m.SPSOutgoingTransactionsUpdateComponent),
    resolve: {
      sPSOutgoingTransactions: SPSOutgoingTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/sps-outgoing-transactions-update.component').then(m => m.SPSOutgoingTransactionsUpdateComponent),
    resolve: {
      sPSOutgoingTransactions: SPSOutgoingTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default sPSOutgoingTransactionsRoute;
