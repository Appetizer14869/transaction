import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CBSTransactionsResolve from './route/cbs-transactions-routing-resolve.service';

const cBSTransactionsRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/cbs-transactions.component').then(m => m.CBSTransactionsComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/cbs-transactions-detail.component').then(m => m.CBSTransactionsDetailComponent),
    resolve: {
      cBSTransactions: CBSTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/cbs-transactions-update.component').then(m => m.CBSTransactionsUpdateComponent),
    resolve: {
      cBSTransactions: CBSTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/cbs-transactions-update.component').then(m => m.CBSTransactionsUpdateComponent),
    resolve: {
      cBSTransactions: CBSTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cBSTransactionsRoute;
