import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISPSParticipatingCodes, NewSPSParticipatingCodes } from '../sps-participating-codes.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISPSParticipatingCodes for edit and NewSPSParticipatingCodesFormGroupInput for create.
 */
type SPSParticipatingCodesFormGroupInput = ISPSParticipatingCodes | PartialWithRequiredKeyOf<NewSPSParticipatingCodes>;

type SPSParticipatingCodesFormDefaults = Pick<NewSPSParticipatingCodes, 'id'>;

type SPSParticipatingCodesFormGroupContent = {
  id: FormControl<ISPSParticipatingCodes['id'] | NewSPSParticipatingCodes['id']>;
  biccode: FormControl<ISPSParticipatingCodes['biccode']>;
  bicname: FormControl<ISPSParticipatingCodes['bicname']>;
  bicstatus: FormControl<ISPSParticipatingCodes['bicstatus']>;
};

export type SPSParticipatingCodesFormGroup = FormGroup<SPSParticipatingCodesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SPSParticipatingCodesFormService {
  createSPSParticipatingCodesFormGroup(
    sPSParticipatingCodes: SPSParticipatingCodesFormGroupInput = { id: null },
  ): SPSParticipatingCodesFormGroup {
    const sPSParticipatingCodesRawValue = {
      ...this.getFormDefaults(),
      ...sPSParticipatingCodes,
    };
    return new FormGroup<SPSParticipatingCodesFormGroupContent>({
      id: new FormControl(
        { value: sPSParticipatingCodesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      biccode: new FormControl(sPSParticipatingCodesRawValue.biccode, {
        validators: [Validators.maxLength(8)],
      }),
      bicname: new FormControl(sPSParticipatingCodesRawValue.bicname, {
        validators: [Validators.maxLength(12)],
      }),
      bicstatus: new FormControl(sPSParticipatingCodesRawValue.bicstatus, {
        validators: [Validators.maxLength(10)],
      }),
    });
  }

  getSPSParticipatingCodes(form: SPSParticipatingCodesFormGroup): ISPSParticipatingCodes | NewSPSParticipatingCodes {
    return form.getRawValue() as ISPSParticipatingCodes | NewSPSParticipatingCodes;
  }

  resetForm(form: SPSParticipatingCodesFormGroup, sPSParticipatingCodes: SPSParticipatingCodesFormGroupInput): void {
    const sPSParticipatingCodesRawValue = { ...this.getFormDefaults(), ...sPSParticipatingCodes };
    form.reset(
      {
        ...sPSParticipatingCodesRawValue,
        id: { value: sPSParticipatingCodesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SPSParticipatingCodesFormDefaults {
    return {
      id: null,
    };
  }
}
