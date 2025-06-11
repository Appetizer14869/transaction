import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISPSIncomingTransactions } from '../sps-incoming-transactions.model';
import { SPSIncomingTransactionsService } from '../service/sps-incoming-transactions.service';

@Component({
  templateUrl: './sps-incoming-transactions-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SPSIncomingTransactionsDeleteDialogComponent {
  sPSIncomingTransactions?: ISPSIncomingTransactions;

  protected sPSIncomingTransactionsService = inject(SPSIncomingTransactionsService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sPSIncomingTransactionsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
