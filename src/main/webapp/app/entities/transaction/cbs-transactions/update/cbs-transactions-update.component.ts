import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICBSTransactions } from '../cbs-transactions.model';
import { CBSTransactionsService } from '../service/cbs-transactions.service';
import { CBSTransactionsFormGroup, CBSTransactionsFormService } from './cbs-transactions-form.service';

@Component({
  selector: 'jhi-cbs-transactions-update',
  templateUrl: './cbs-transactions-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CBSTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  cBSTransactions: ICBSTransactions | null = null;

  protected cBSTransactionsService = inject(CBSTransactionsService);
  protected cBSTransactionsFormService = inject(CBSTransactionsFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CBSTransactionsFormGroup = this.cBSTransactionsFormService.createCBSTransactionsFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cBSTransactions }) => {
      this.cBSTransactions = cBSTransactions;
      if (cBSTransactions) {
        this.updateForm(cBSTransactions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cBSTransactions = this.cBSTransactionsFormService.getCBSTransactions(this.editForm);
    if (cBSTransactions.id !== null) {
      this.subscribeToSaveResponse(this.cBSTransactionsService.update(cBSTransactions));
    } else {
      this.subscribeToSaveResponse(this.cBSTransactionsService.create(cBSTransactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICBSTransactions>>): void {
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

  protected updateForm(cBSTransactions: ICBSTransactions): void {
    this.cBSTransactions = cBSTransactions;
    this.cBSTransactionsFormService.resetForm(this.editForm, cBSTransactions);
  }
}
