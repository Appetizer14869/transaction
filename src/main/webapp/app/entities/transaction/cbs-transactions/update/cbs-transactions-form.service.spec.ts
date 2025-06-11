import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../cbs-transactions.test-samples';

import { CBSTransactionsFormService } from './cbs-transactions-form.service';

describe('CBSTransactions Form Service', () => {
  let service: CBSTransactionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CBSTransactionsFormService);
  });

  describe('Service methods', () => {
    describe('createCBSTransactionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCBSTransactionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            messageid: expect.any(Object),
            channelcode: expect.any(Object),
            messagetype: expect.any(Object),
            transcurrency: expect.any(Object),
            debtorsname: expect.any(Object),
            debtorsaccountid: expect.any(Object),
            debtorsphone: expect.any(Object),
            creditorsname: expect.any(Object),
            creditorsaccountid: expect.any(Object),
            creditorsphone: expect.any(Object),
            narration: expect.any(Object),
            externalreference: expect.any(Object),
            cbsreference: expect.any(Object),
            cbsstatus: expect.any(Object),
            cbsstatusdesc: expect.any(Object),
            requestInstanttime: expect.any(Object),
            requestjson: expect.any(Object),
            cbsrequestxml: expect.any(Object),
            cbsresponsexml: expect.any(Object),
            amount: expect.any(Object),
          }),
        );
      });

      it('passing ICBSTransactions should create a new form with FormGroup', () => {
        const formGroup = service.createCBSTransactionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            messageid: expect.any(Object),
            channelcode: expect.any(Object),
            messagetype: expect.any(Object),
            transcurrency: expect.any(Object),
            debtorsname: expect.any(Object),
            debtorsaccountid: expect.any(Object),
            debtorsphone: expect.any(Object),
            creditorsname: expect.any(Object),
            creditorsaccountid: expect.any(Object),
            creditorsphone: expect.any(Object),
            narration: expect.any(Object),
            externalreference: expect.any(Object),
            cbsreference: expect.any(Object),
            cbsstatus: expect.any(Object),
            cbsstatusdesc: expect.any(Object),
            requestInstanttime: expect.any(Object),
            requestjson: expect.any(Object),
            cbsrequestxml: expect.any(Object),
            cbsresponsexml: expect.any(Object),
            amount: expect.any(Object),
          }),
        );
      });
    });

    describe('getCBSTransactions', () => {
      it('should return NewCBSTransactions for default CBSTransactions initial value', () => {
        const formGroup = service.createCBSTransactionsFormGroup(sampleWithNewData);

        const cBSTransactions = service.getCBSTransactions(formGroup) as any;

        expect(cBSTransactions).toMatchObject(sampleWithNewData);
      });

      it('should return NewCBSTransactions for empty CBSTransactions initial value', () => {
        const formGroup = service.createCBSTransactionsFormGroup();

        const cBSTransactions = service.getCBSTransactions(formGroup) as any;

        expect(cBSTransactions).toMatchObject({});
      });

      it('should return ICBSTransactions', () => {
        const formGroup = service.createCBSTransactionsFormGroup(sampleWithRequiredData);

        const cBSTransactions = service.getCBSTransactions(formGroup) as any;

        expect(cBSTransactions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICBSTransactions should not enable id FormControl', () => {
        const formGroup = service.createCBSTransactionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCBSTransactions should disable id FormControl', () => {
        const formGroup = service.createCBSTransactionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
