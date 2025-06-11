import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISPSParticipatingCodes } from '../sps-participating-codes.model';
import { SPSParticipatingCodesService } from '../service/sps-participating-codes.service';

@Component({
  templateUrl: './sps-participating-codes-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SPSParticipatingCodesDeleteDialogComponent {
  sPSParticipatingCodes?: ISPSParticipatingCodes;

  protected sPSParticipatingCodesService = inject(SPSParticipatingCodesService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sPSParticipatingCodesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
