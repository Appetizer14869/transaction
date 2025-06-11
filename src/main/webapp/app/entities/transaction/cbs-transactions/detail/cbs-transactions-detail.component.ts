import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { ICBSTransactions } from '../cbs-transactions.model';

@Component({
  selector: 'jhi-cbs-transactions-detail',
  templateUrl: './cbs-transactions-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class CBSTransactionsDetailComponent {
  cBSTransactions = input<ICBSTransactions | null>(null);

  previousState(): void {
    window.history.back();
  }
}
