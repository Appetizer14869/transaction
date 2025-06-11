import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICBSTransactions } from '../cbs-transactions.model';
import { CBSTransactionsService } from '../service/cbs-transactions.service';

@Component({
  templateUrl: './cbs-transactions-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CBSTransactionsDeleteDialogComponent {
  cBSTransactions?: ICBSTransactions;

  protected cBSTransactionsService = inject(CBSTransactionsService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cBSTransactionsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
