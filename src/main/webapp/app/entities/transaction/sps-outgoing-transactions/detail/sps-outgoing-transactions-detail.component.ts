import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { ISPSOutgoingTransactions } from '../sps-outgoing-transactions.model';

@Component({
  selector: 'jhi-sps-outgoing-transactions-detail',
  templateUrl: './sps-outgoing-transactions-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class SPSOutgoingTransactionsDetailComponent {
  sPSOutgoingTransactions = input<ISPSOutgoingTransactions | null>(null);

  previousState(): void {
    window.history.back();
  }
}
