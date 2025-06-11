import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../sps-outgoing-transactions.test-samples';

import { SPSOutgoingTransactionsFormService } from './sps-outgoing-transactions-form.service';

describe('SPSOutgoingTransactions Form Service', () => {
  let service: SPSOutgoingTransactionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SPSOutgoingTransactionsFormService);
  });

  describe('Service methods', () => {
    describe('createSPSOutgoingTransactionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSPSOutgoingTransactionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            messageid: expect.any(Object),
            channelcode: expect.any(Object),
            callbackurl: expect.any(Object),
            messagetype: expect.any(Object),
            transcurrency: expect.any(Object),
            debtorsname: expect.any(Object),
            debtorsaccountid: expect.any(Object),
            debtorsbankcode: expect.any(Object),
            debtorsphone: expect.any(Object),
            beneficiaryname: expect.any(Object),
            beneficiaryaccountid: expect.any(Object),
            beneficiarybankcode: expect.any(Object),
            beneficiaryphone: expect.any(Object),
            narration: expect.any(Object),
            externalreference: expect.any(Object),
            cbsreference: expect.any(Object),
            messageendtoendid: expect.any(Object),
            transactionstatus: expect.any(Object),
            transactionstatusdesc: expect.any(Object),
            spsstatus: expect.any(Object),
            spsstatusdesc: expect.any(Object),
            cbsstatus: expect.any(Object),
            cbsstatusdesc: expect.any(Object),
            requestInstanttime: expect.any(Object),
            isomessagetype: expect.any(Object),
            requestjson: expect.any(Object),
            spsrequestxml: expect.any(Object),
            spsresponsexml: expect.any(Object),
            amount: expect.any(Object),
            callbackstatus: expect.any(Object),
            callbackstatusdesc: expect.any(Object),
          }),
        );
      });

      it('passing ISPSOutgoingTransactions should create a new form with FormGroup', () => {
        const formGroup = service.createSPSOutgoingTransactionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            messageid: expect.any(Object),
            channelcode: expect.any(Object),
            callbackurl: expect.any(Object),
            messagetype: expect.any(Object),
            transcurrency: expect.any(Object),
            debtorsname: expect.any(Object),
            debtorsaccountid: expect.any(Object),
            debtorsbankcode: expect.any(Object),
            debtorsphone: expect.any(Object),
            beneficiaryname: expect.any(Object),
            beneficiaryaccountid: expect.any(Object),
            beneficiarybankcode: expect.any(Object),
            beneficiaryphone: expect.any(Object),
            narration: expect.any(Object),
            externalreference: expect.any(Object),
            cbsreference: expect.any(Object),
            messageendtoendid: expect.any(Object),
            transactionstatus: expect.any(Object),
            transactionstatusdesc: expect.any(Object),
            spsstatus: expect.any(Object),
            spsstatusdesc: expect.any(Object),
            cbsstatus: expect.any(Object),
            cbsstatusdesc: expect.any(Object),
            requestInstanttime: expect.any(Object),
            isomessagetype: expect.any(Object),
            requestjson: expect.any(Object),
            spsrequestxml: expect.any(Object),
            spsresponsexml: expect.any(Object),
            amount: expect.any(Object),
            callbackstatus: expect.any(Object),
            callbackstatusdesc: expect.any(Object),
          }),
        );
      });
    });

    describe('getSPSOutgoingTransactions', () => {
      it('should return NewSPSOutgoingTransactions for default SPSOutgoingTransactions initial value', () => {
        const formGroup = service.createSPSOutgoingTransactionsFormGroup(sampleWithNewData);

        const sPSOutgoingTransactions = service.getSPSOutgoingTransactions(formGroup) as any;

        expect(sPSOutgoingTransactions).toMatchObject(sampleWithNewData);
      });

      it('should return NewSPSOutgoingTransactions for empty SPSOutgoingTransactions initial value', () => {
        const formGroup = service.createSPSOutgoingTransactionsFormGroup();

        const sPSOutgoingTransactions = service.getSPSOutgoingTransactions(formGroup) as any;

        expect(sPSOutgoingTransactions).toMatchObject({});
      });

      it('should return ISPSOutgoingTransactions', () => {
        const formGroup = service.createSPSOutgoingTransactionsFormGroup(sampleWithRequiredData);

        const sPSOutgoingTransactions = service.getSPSOutgoingTransactions(formGroup) as any;

        expect(sPSOutgoingTransactions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISPSOutgoingTransactions should not enable id FormControl', () => {
        const formGroup = service.createSPSOutgoingTransactionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSPSOutgoingTransactions should disable id FormControl', () => {
        const formGroup = service.createSPSOutgoingTransactionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
