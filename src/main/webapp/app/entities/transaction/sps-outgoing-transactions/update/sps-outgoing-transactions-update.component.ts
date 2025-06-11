import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISPSOutgoingTransactions } from '../sps-outgoing-transactions.model';
import { SPSOutgoingTransactionsService } from '../service/sps-outgoing-transactions.service';
import { SPSOutgoingTransactionsFormGroup, SPSOutgoingTransactionsFormService } from './sps-outgoing-transactions-form.service';

@Component({
  selector: 'jhi-sps-outgoing-transactions-update',
  templateUrl: './sps-outgoing-transactions-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SPSOutgoingTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  sPSOutgoingTransactions: ISPSOutgoingTransactions | null = null;

  protected sPSOutgoingTransactionsService = inject(SPSOutgoingTransactionsService);
  protected sPSOutgoingTransactionsFormService = inject(SPSOutgoingTransactionsFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SPSOutgoingTransactionsFormGroup = this.sPSOutgoingTransactionsFormService.createSPSOutgoingTransactionsFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sPSOutgoingTransactions }) => {
      this.sPSOutgoingTransactions = sPSOutgoingTransactions;
      if (sPSOutgoingTransactions) {
        this.updateForm(sPSOutgoingTransactions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sPSOutgoingTransactions = this.sPSOutgoingTransactionsFormService.getSPSOutgoingTransactions(this.editForm);
    if (sPSOutgoingTransactions.id !== null) {
      this.subscribeToSaveResponse(this.sPSOutgoingTransactionsService.update(sPSOutgoingTransactions));
    } else {
      this.subscribeToSaveResponse(this.sPSOutgoingTransactionsService.create(sPSOutgoingTransactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISPSOutgoingTransactions>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(sPSOutgoingTransactions: ISPSOutgoingTransactions): void {
    this.sPSOutgoingTransactions = sPSOutgoingTransactions;
    this.sPSOutgoingTransactionsFormService.resetForm(this.editForm, sPSOutgoingTransactions);
  }
}
