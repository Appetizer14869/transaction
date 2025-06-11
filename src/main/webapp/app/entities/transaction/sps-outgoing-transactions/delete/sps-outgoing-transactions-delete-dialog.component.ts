import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISPSOutgoingTransactions } from '../sps-outgoing-transactions.model';
import { SPSOutgoingTransactionsService } from '../service/sps-outgoing-transactions.service';

@Component({
  templateUrl: './sps-outgoing-transactions-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SPSOutgoingTransactionsDeleteDialogComponent {
  sPSOutgoingTransactions?: ISPSOutgoingTransactions;

  protected sPSOutgoingTransactionsService = inject(SPSOutgoingTransactionsService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sPSOutgoingTransactionsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
