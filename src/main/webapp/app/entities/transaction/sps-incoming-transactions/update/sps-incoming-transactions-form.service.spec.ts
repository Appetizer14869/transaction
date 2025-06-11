import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../sps-incoming-transactions.test-samples';

import { SPSIncomingTransactionsFormService } from './sps-incoming-transactions-form.service';

describe('SPSIncomingTransactions Form Service', () => {
  let service: SPSIncomingTransactionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SPSIncomingTransactionsFormService);
  });

  describe('Service methods', () => {
    describe('createSPSIncomingTransactionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSPSIncomingTransactionsFormGroup();

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
          }),
        );
      });

      it('passing ISPSIncomingTransactions should create a new form with FormGroup', () => {
        const formGroup = service.createSPSIncomingTransactionsFormGroup(sampleWithRequiredData);

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
          }),
        );
      });
    });

    describe('getSPSIncomingTransactions', () => {
      it('should return NewSPSIncomingTransactions for default SPSIncomingTransactions initial value', () => {
        const formGroup = service.createSPSIncomingTransactionsFormGroup(sampleWithNewData);

        const sPSIncomingTransactions = service.getSPSIncomingTransactions(formGroup) as any;

        expect(sPSIncomingTransactions).toMatchObject(sampleWithNewData);
      });

      it('should return NewSPSIncomingTransactions for empty SPSIncomingTransactions initial value', () => {
        const formGroup = service.createSPSIncomingTransactionsFormGroup();

        const sPSIncomingTransactions = service.getSPSIncomingTransactions(formGroup) as any;

        expect(sPSIncomingTransactions).toMatchObject({});
      });

      it('should return ISPSIncomingTransactions', () => {
        const formGroup = service.createSPSIncomingTransactionsFormGroup(sampleWithRequiredData);

        const sPSIncomingTransactions = service.getSPSIncomingTransactions(formGroup) as any;

        expect(sPSIncomingTransactions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISPSIncomingTransactions should not enable id FormControl', () => {
        const formGroup = service.createSPSIncomingTransactionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSPSIncomingTransactions should disable id FormControl', () => {
        const formGroup = service.createSPSIncomingTransactionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
