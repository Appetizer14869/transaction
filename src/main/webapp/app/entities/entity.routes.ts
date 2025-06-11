import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sps-participating-codes',
    data: { pageTitle: 'transactionApp.transactionSPsParticipatingCodes.home.title' },
    loadChildren: () => import('./transaction/sps-participating-codes/sps-participating-codes.routes'),
  },
  {
    path: 'sps-outgoing-transactions',
    data: { pageTitle: 'transactionApp.transactionSPsOutgoingTransactions.home.title' },
    loadChildren: () => import('./transaction/sps-outgoing-transactions/sps-outgoing-transactions.routes'),
  },
  {
    path: 'sps-incoming-transactions',
    data: { pageTitle: 'transactionApp.transactionSPsIncomingTransactions.home.title' },
    loadChildren: () => import('./transaction/sps-incoming-transactions/sps-incoming-transactions.routes'),
  },
  {
    path: 'cbs-transactions',
    data: { pageTitle: 'transactionApp.transactionCBsTransactions.home.title' },
    loadChildren: () => import('./transaction/cbs-transactions/cbs-transactions.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
