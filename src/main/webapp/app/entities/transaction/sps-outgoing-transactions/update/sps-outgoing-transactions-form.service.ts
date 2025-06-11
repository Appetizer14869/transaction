import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISPSOutgoingTransactions, NewSPSOutgoingTransactions } from '../sps-outgoing-transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISPSOutgoingTransactions for edit and NewSPSOutgoingTransactionsFormGroupInput for create.
 */
type SPSOutgoingTransactionsFormGroupInput = ISPSOutgoingTransactions | PartialWithRequiredKeyOf<NewSPSOutgoingTransactions>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISPSOutgoingTransactions | NewSPSOutgoingTransactions> = Omit<T, 'requestInstanttime'> & {
  requestInstanttime?: string | null;
};

type SPSOutgoingTransactionsFormRawValue = FormValueOf<ISPSOutgoingTransactions>;

type NewSPSOutgoingTransactionsFormRawValue = FormValueOf<NewSPSOutgoingTransactions>;

type SPSOutgoingTransactionsFormDefaults = Pick<NewSPSOutgoingTransactions, 'id' | 'requestInstanttime'>;

type SPSOutgoingTransactionsFormGroupContent = {
  id: FormControl<SPSOutgoingTransactionsFormRawValue['id'] | NewSPSOutgoingTransactions['id']>;
  messageid: FormControl<SPSOutgoingTransactionsFormRawValue['messageid']>;
  channelcode: FormControl<SPSOutgoingTransactionsFormRawValue['channelcode']>;
  callbackurl: FormControl<SPSOutgoingTransactionsFormRawValue['callbackurl']>;
  messagetype: FormControl<SPSOutgoingTransactionsFormRawValue['messagetype']>;
  transcurrency: FormControl<SPSOutgoingTransactionsFormRawValue['transcurrency']>;
  debtorsname: FormControl<SPSOutgoingTransactionsFormRawValue['debtorsname']>;
  debtorsaccountid: FormControl<SPSOutgoingTransactionsFormRawValue['debtorsaccountid']>;
  debtorsbankcode: FormControl<SPSOutgoingTransactionsFormRawValue['debtorsbankcode']>;
  debtorsphone: FormControl<SPSOutgoingTransactionsFormRawValue['debtorsphone']>;
  beneficiaryname: FormControl<SPSOutgoingTransactionsFormRawValue['beneficiaryname']>;
  beneficiaryaccountid: FormControl<SPSOutgoingTransactionsFormRawValue['beneficiaryaccountid']>;
  beneficiarybankcode: FormControl<SPSOutgoingTransactionsFormRawValue['beneficiarybankcode']>;
  beneficiaryphone: FormControl<SPSOutgoingTransactionsFormRawValue['beneficiaryphone']>;
  narration: FormControl<SPSOutgoingTransactionsFormRawValue['narration']>;
  externalreference: FormControl<SPSOutgoingTransactionsFormRawValue['externalreference']>;
  cbsreference: FormControl<SPSOutgoingTransactionsFormRawValue['cbsreference']>;
  messageendtoendid: FormControl<SPSOutgoingTransactionsFormRawValue['messageendtoendid']>;
  transactionstatus: FormControl<SPSOutgoingTransactionsFormRawValue['transactionstatus']>;
  transactionstatusdesc: FormControl<SPSOutgoingTransactionsFormRawValue['transactionstatusdesc']>;
  spsstatus: FormControl<SPSOutgoingTransactionsFormRawValue['spsstatus']>;
  spsstatusdesc: FormControl<SPSOutgoingTransactionsFormRawValue['spsstatusdesc']>;
  cbsstatus: FormControl<SPSOutgoingTransactionsFormRawValue['cbsstatus']>;
  cbsstatusdesc: FormControl<SPSOutgoingTransactionsFormRawValue['cbsstatusdesc']>;
  requestInstanttime: FormControl<SPSOutgoingTransactionsFormRawValue['requestInstanttime']>;
  isomessagetype: FormControl<SPSOutgoingTransactionsFormRawValue['isomessagetype']>;
  requestjson: FormControl<SPSOutgoingTransactionsFormRawValue['requestjson']>;
  spsrequestxml: FormControl<SPSOutgoingTransactionsFormRawValue['spsrequestxml']>;
  spsresponsexml: FormControl<SPSOutgoingTransactionsFormRawValue['spsresponsexml']>;
  amount: FormControl<SPSOutgoingTransactionsFormRawValue['amount']>;
  callbackstatus: FormControl<SPSOutgoingTransactionsFormRawValue['callbackstatus']>;
  callbackstatusdesc: FormControl<SPSOutgoingTransactionsFormRawValue['callbackstatusdesc']>;
};

export type SPSOutgoingTransactionsFormGroup = FormGroup<SPSOutgoingTransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SPSOutgoingTransactionsFormService {
  createSPSOutgoingTransactionsFormGroup(
    sPSOutgoingTransactions: SPSOutgoingTransactionsFormGroupInput = { id: null },
  ): SPSOutgoingTransactionsFormGroup {
    const sPSOutgoingTransactionsRawValue = this.convertSPSOutgoingTransactionsToSPSOutgoingTransactionsRawValue({
      ...this.getFormDefaults(),
      ...sPSOutgoingTransactions,
    });
    return new FormGroup<SPSOutgoingTransactionsFormGroupContent>({
      id: new FormControl(
        { value: sPSOutgoingTransactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      messageid: new FormControl(sPSOutgoingTransactionsRawValue.messageid, {
        validators: [Validators.maxLength(40)],
      }),
      channelcode: new FormControl(sPSOutgoingTransactionsRawValue.channelcode, {
        validators: [Validators.maxLength(16)],
      }),
      callbackurl: new FormControl(sPSOutgoingTransactionsRawValue.callbackurl, {
        validators: [Validators.maxLength(100)],
      }),
      messagetype: new FormControl(sPSOutgoingTransactionsRawValue.messagetype, {
        validators: [Validators.maxLength(28)],
      }),
      transcurrency: new FormControl(sPSOutgoingTransactionsRawValue.transcurrency, {
        validators: [Validators.maxLength(10)],
      }),
      debtorsname: new FormControl(sPSOutgoingTransactionsRawValue.debtorsname, {
        validators: [Validators.maxLength(100)],
      }),
      debtorsaccountid: new FormControl(sPSOutgoingTransactionsRawValue.debtorsaccountid, {
        validators: [Validators.maxLength(30)],
      }),
      debtorsbankcode: new FormControl(sPSOutgoingTransactionsRawValue.debtorsbankcode, {
        validators: [Validators.maxLength(18)],
      }),
      debtorsphone: new FormControl(sPSOutgoingTransactionsRawValue.debtorsphone, {
        validators: [Validators.maxLength(19)],
      }),
      beneficiaryname: new FormControl(sPSOutgoingTransactionsRawValue.beneficiaryname, {
        validators: [Validators.maxLength(100)],
      }),
      beneficiaryaccountid: new FormControl(sPSOutgoingTransactionsRawValue.beneficiaryaccountid, {
        validators: [Validators.maxLength(30)],
      }),
      beneficiarybankcode: new FormControl(sPSOutgoingTransactionsRawValue.beneficiarybankcode, {
        validators: [Validators.maxLength(19)],
      }),
      beneficiaryphone: new FormControl(sPSOutgoingTransactionsRawValue.beneficiaryphone, {
        validators: [Validators.maxLength(19)],
      }),
      narration: new FormControl(sPSOutgoingTransactionsRawValue.narration, {
        validators: [Validators.maxLength(100)],
      }),
      externalreference: new FormControl(sPSOutgoingTransactionsRawValue.externalreference, {
        validators: [Validators.maxLength(40)],
      }),
      cbsreference: new FormControl(sPSOutgoingTransactionsRawValue.cbsreference, {
        validators: [Validators.maxLength(40)],
      }),
      messageendtoendid: new FormControl(sPSOutgoingTransactionsRawValue.messageendtoendid, {
        validators: [Validators.maxLength(40)],
      }),
      transactionstatus: new FormControl(sPSOutgoingTransactionsRawValue.transactionstatus, {
        validators: [Validators.maxLength(19)],
      }),
      transactionstatusdesc: new FormControl(sPSOutgoingTransactionsRawValue.transactionstatusdesc, {
        validators: [Validators.maxLength(200)],
      }),
      spsstatus: new FormControl(sPSOutgoingTransactionsRawValue.spsstatus, {
        validators: [Validators.maxLength(19)],
      }),
      spsstatusdesc: new FormControl(sPSOutgoingTransactionsRawValue.spsstatusdesc, {
        validators: [Validators.maxLength(200)],
      }),
      cbsstatus: new FormControl(sPSOutgoingTransactionsRawValue.cbsstatus, {
        validators: [Validators.maxLength(19)],
      }),
      cbsstatusdesc: new FormControl(sPSOutgoingTransactionsRawValue.cbsstatusdesc, {
        validators: [Validators.maxLength(200)],
      }),
      requestInstanttime: new FormControl(sPSOutgoingTransactionsRawValue.requestInstanttime),
      isomessagetype: new FormControl(sPSOutgoingTransactionsRawValue.isomessagetype, {
        validators: [Validators.maxLength(29)],
      }),
      requestjson: new FormControl(sPSOutgoingTransactionsRawValue.requestjson),
      spsrequestxml: new FormControl(sPSOutgoingTransactionsRawValue.spsrequestxml),
      spsresponsexml: new FormControl(sPSOutgoingTransactionsRawValue.spsresponsexml),
      amount: new FormControl(sPSOutgoingTransactionsRawValue.amount),
      callbackstatus: new FormControl(sPSOutgoingTransactionsRawValue.callbackstatus, {
        validators: [Validators.maxLength(10)],
      }),
      callbackstatusdesc: new FormControl(sPSOutgoingTransactionsRawValue.callbackstatusdesc, {
        validators: [Validators.maxLength(100)],
      }),
    });
  }

  getSPSOutgoingTransactions(form: SPSOutgoingTransactionsFormGroup): ISPSOutgoingTransactions | NewSPSOutgoingTransactions {
    return this.convertSPSOutgoingTransactionsRawValueToSPSOutgoingTransactions(
      form.getRawValue() as SPSOutgoingTransactionsFormRawValue | NewSPSOutgoingTransactionsFormRawValue,
    );
  }

  resetForm(form: SPSOutgoingTransactionsFormGroup, sPSOutgoingTransactions: SPSOutgoingTransactionsFormGroupInput): void {
    const sPSOutgoingTransactionsRawValue = this.convertSPSOutgoingTransactionsToSPSOutgoingTransactionsRawValue({
      ...this.getFormDefaults(),
      ...sPSOutgoingTransactions,
    });
    form.reset(
      {
        ...sPSOutgoingTransactionsRawValue,
        id: { value: sPSOutgoingTransactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SPSOutgoingTransactionsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      requestInstanttime: currentTime,
    };
  }

  private convertSPSOutgoingTransactionsRawValueToSPSOutgoingTransactions(
    rawSPSOutgoingTransactions: SPSOutgoingTransactionsFormRawValue | NewSPSOutgoingTransactionsFormRawValue,
  ): ISPSOutgoingTransactions | NewSPSOutgoingTransactions {
    return {
      ...rawSPSOutgoingTransactions,
      requestInstanttime: dayjs(rawSPSOutgoingTransactions.requestInstanttime, DATE_TIME_FORMAT),
    };
  }

  private convertSPSOutgoingTransactionsToSPSOutgoingTransactionsRawValue(
    sPSOutgoingTransactions: ISPSOutgoingTransactions | (Partial<NewSPSOutgoingTransactions> & SPSOutgoingTransactionsFormDefaults),
  ): SPSOutgoingTransactionsFormRawValue | PartialWithRequiredKeyOf<NewSPSOutgoingTransactionsFormRawValue> {
    return {
      ...sPSOutgoingTransactions,
      requestInstanttime: sPSOutgoingTransactions.requestInstanttime
        ? sPSOutgoingTransactions.requestInstanttime.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
