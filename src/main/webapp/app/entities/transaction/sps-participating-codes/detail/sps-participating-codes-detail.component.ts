import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ISPSParticipatingCodes } from '../sps-participating-codes.model';

@Component({
  selector: 'jhi-sps-participating-codes-detail',
  templateUrl: './sps-participating-codes-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class SPSParticipatingCodesDetailComponent {
  sPSParticipatingCodes = input<ISPSParticipatingCodes | null>(null);

  previousState(): void {
    window.history.back();
  }
}
