import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../sps-participating-codes.test-samples';

import { SPSParticipatingCodesFormService } from './sps-participating-codes-form.service';

describe('SPSParticipatingCodes Form Service', () => {
  let service: SPSParticipatingCodesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SPSParticipatingCodesFormService);
  });

  describe('Service methods', () => {
    describe('createSPSParticipatingCodesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSPSParticipatingCodesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            biccode: expect.any(Object),
            bicname: expect.any(Object),
            bicstatus: expect.any(Object),
          }),
        );
      });

      it('passing ISPSParticipatingCodes should create a new form with FormGroup', () => {
        const formGroup = service.createSPSParticipatingCodesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            biccode: expect.any(Object),
            bicname: expect.any(Object),
            bicstatus: expect.any(Object),
          }),
        );
      });
    });

    describe('getSPSParticipatingCodes', () => {
      it('should return NewSPSParticipatingCodes for default SPSParticipatingCodes initial value', () => {
        const formGroup = service.createSPSParticipatingCodesFormGroup(sampleWithNewData);

        const sPSParticipatingCodes = service.getSPSParticipatingCodes(formGroup) as any;

        expect(sPSParticipatingCodes).toMatchObject(sampleWithNewData);
      });

      it('should return NewSPSParticipatingCodes for empty SPSParticipatingCodes initial value', () => {
        const formGroup = service.createSPSParticipatingCodesFormGroup();

        const sPSParticipatingCodes = service.getSPSParticipatingCodes(formGroup) as any;

        expect(sPSParticipatingCodes).toMatchObject({});
      });

      it('should return ISPSParticipatingCodes', () => {
        const formGroup = service.createSPSParticipatingCodesFormGroup(sampleWithRequiredData);

        const sPSParticipatingCodes = service.getSPSParticipatingCodes(formGroup) as any;

        expect(sPSParticipatingCodes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISPSParticipatingCodes should not enable id FormControl', () => {
        const formGroup = service.createSPSParticipatingCodesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSPSParticipatingCodes should disable id FormControl', () => {
        const formGroup = service.createSPSParticipatingCodesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
