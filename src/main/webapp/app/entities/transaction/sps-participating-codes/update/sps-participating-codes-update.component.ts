import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISPSParticipatingCodes } from '../sps-participating-codes.model';
import { SPSParticipatingCodesService } from '../service/sps-participating-codes.service';
import { SPSParticipatingCodesFormGroup, SPSParticipatingCodesFormService } from './sps-participating-codes-form.service';

@Component({
  selector: 'jhi-sps-participating-codes-update',
  templateUrl: './sps-participating-codes-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SPSParticipatingCodesUpdateComponent implements OnInit {
  isSaving = false;
  sPSParticipatingCodes: ISPSParticipatingCodes | null = null;

  protected sPSParticipatingCodesService = inject(SPSParticipatingCodesService);
  protected sPSParticipatingCodesFormService = inject(SPSParticipatingCodesFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SPSParticipatingCodesFormGroup = this.sPSParticipatingCodesFormService.createSPSParticipatingCodesFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sPSParticipatingCodes }) => {
      this.sPSParticipatingCodes = sPSParticipatingCodes;
      if (sPSParticipatingCodes) {
        this.updateForm(sPSParticipatingCodes);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sPSParticipatingCodes = this.sPSParticipatingCodesFormService.getSPSParticipatingCodes(this.editForm);
    if (sPSParticipatingCodes.id !== null) {
      this.subscribeToSaveResponse(this.sPSParticipatingCodesService.update(sPSParticipatingCodes));
    } else {
      this.subscribeToSaveResponse(this.sPSParticipatingCodesService.create(sPSParticipatingCodes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISPSParticipatingCodes>>): void {
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

  protected updateForm(sPSParticipatingCodes: ISPSParticipatingCodes): void {
    this.sPSParticipatingCodes = sPSParticipatingCodes;
    this.sPSParticipatingCodesFormService.resetForm(this.editForm, sPSParticipatingCodes);
  }
}
