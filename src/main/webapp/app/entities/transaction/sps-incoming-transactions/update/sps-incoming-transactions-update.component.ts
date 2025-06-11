import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISPSIncomingTransactions } from '../sps-incoming-transactions.model';
import { SPSIncomingTransactionsService } from '../service/sps-incoming-transactions.service';
import { SPSIncomingTransactionsFormGroup, SPSIncomingTransactionsFormService } from './sps-incoming-transactions-form.service';

@Component({
  selector: 'jhi-sps-incoming-transactions-update',
  templateUrl: './sps-incoming-transactions-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SPSIncomingTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  sPSIncomingTransactions: ISPSIncomingTransactions | null = null;

  protected sPSIncomingTransactionsService = inject(SPSIncomingTransactionsService);
  protected sPSIncomingTransactionsFormService = inject(SPSIncomingTransactionsFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SPSIncomingTransactionsFormGroup = this.sPSIncomingTransactionsFormService.createSPSIncomingTransactionsFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sPSIncomingTransactions }) => {
      this.sPSIncomingTransactions = sPSIncomingTransactions;
      if (sPSIncomingTransactions) {
        this.updateForm(sPSIncomingTransactions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sPSIncomingTransactions = this.sPSIncomingTransactionsFormService.getSPSIncomingTransactions(this.editForm);
    if (sPSIncomingTransactions.id !== null) {
      this.subscribeToSaveResponse(this.sPSIncomingTransactionsService.update(sPSIncomingTransactions));
    } else {
      this.subscribeToSaveResponse(this.sPSIncomingTransactionsService.create(sPSIncomingTransactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISPSIncomingTransactions>>): void {
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

  protected updateForm(sPSIncomingTransactions: ISPSIncomingTransactions): void {
    this.sPSIncomingTransactions = sPSIncomingTransactions;
    this.sPSIncomingTransactionsFormService.resetForm(this.editForm, sPSIncomingTransactions);
  }
}
