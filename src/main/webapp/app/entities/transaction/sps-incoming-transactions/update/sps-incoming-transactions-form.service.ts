import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISPSIncomingTransactions, NewSPSIncomingTransactions } from '../sps-incoming-transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISPSIncomingTransactions for edit and NewSPSIncomingTransactionsFormGroupInput for create.
 */
type SPSIncomingTransactionsFormGroupInput = ISPSIncomingTransactions | PartialWithRequiredKeyOf<NewSPSIncomingTransactions>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISPSIncomingTransactions | NewSPSIncomingTransactions> = Omit<T, 'requestInstanttime'> & {
  requestInstanttime?: string | null;
};

type SPSIncomingTransactionsFormRawValue = FormValueOf<ISPSIncomingTransactions>;

type NewSPSIncomingTransactionsFormRawValue = FormValueOf<NewSPSIncomingTransactions>;

type SPSIncomingTransactionsFormDefaults = Pick<NewSPSIncomingTransactions, 'id' | 'requestInstanttime'>;

type SPSIncomingTransactionsFormGroupContent = {
  id: FormControl<SPSIncomingTransactionsFormRawValue['id'] | NewSPSIncomingTransactions['id']>;
  messageid: FormControl<SPSIncomingTransactionsFormRawValue['messageid']>;
  channelcode: FormControl<SPSIncomingTransactionsFormRawValue['channelcode']>;
  callbackurl: FormControl<SPSIncomingTransactionsFormRawValue['callbackurl']>;
  messagetype: FormControl<SPSIncomingTransactionsFormRawValue['messagetype']>;
  transcurrency: FormControl<SPSIncomingTransactionsFormRawValue['transcurrency']>;
  debtorsname: FormControl<SPSIncomingTransactionsFormRawValue['debtorsname']>;
  debtorsaccountid: FormControl<SPSIncomingTransactionsFormRawValue['debtorsaccountid']>;
  debtorsbankcode: FormControl<SPSIncomingTransactionsFormRawValue['debtorsbankcode']>;
  debtorsphone: FormControl<SPSIncomingTransactionsFormRawValue['debtorsphone']>;
  beneficiaryname: FormControl<SPSIncomingTransactionsFormRawValue['beneficiaryname']>;
  beneficiaryaccountid: FormControl<SPSIncomingTransactionsFormRawValue['beneficiaryaccountid']>;
  beneficiarybankcode: FormControl<SPSIncomingTransactionsFormRawValue['beneficiarybankcode']>;
  beneficiaryphone: FormControl<SPSIncomingTransactionsFormRawValue['beneficiaryphone']>;
  narration: FormControl<SPSIncomingTransactionsFormRawValue['narration']>;
  externalreference: FormControl<SPSIncomingTransactionsFormRawValue['externalreference']>;
  cbsreference: FormControl<SPSIncomingTransactionsFormRawValue['cbsreference']>;
  messageendtoendid: FormControl<SPSIncomingTransactionsFormRawValue['messageendtoendid']>;
  transactionstatus: FormControl<SPSIncomingTransactionsFormRawValue['transactionstatus']>;
  transactionstatusdesc: FormControl<SPSIncomingTransactionsFormRawValue['transactionstatusdesc']>;
  spsstatus: FormControl<SPSIncomingTransactionsFormRawValue['spsstatus']>;
  spsstatusdesc: FormControl<SPSIncomingTransactionsFormRawValue['spsstatusdesc']>;
  cbsstatus: FormControl<SPSIncomingTransactionsFormRawValue['cbsstatus']>;
  cbsstatusdesc: FormControl<SPSIncomingTransactionsFormRawValue['cbsstatusdesc']>;
  requestInstanttime: FormControl<SPSIncomingTransactionsFormRawValue['requestInstanttime']>;
  isomessagetype: FormControl<SPSIncomingTransactionsFormRawValue['isomessagetype']>;
  requestjson: FormControl<SPSIncomingTransactionsFormRawValue['requestjson']>;
  spsrequestxml: FormControl<SPSIncomingTransactionsFormRawValue['spsrequestxml']>;
  spsresponsexml: FormControl<SPSIncomingTransactionsFormRawValue['spsresponsexml']>;
  amount: FormControl<SPSIncomingTransactionsFormRawValue['amount']>;
};

export type SPSIncomingTransactionsFormGroup = FormGroup<SPSIncomingTransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SPSIncomingTransactionsFormService {
  createSPSIncomingTransactionsFormGroup(
    sPSIncomingTransactions: SPSIncomingTransactionsFormGroupInput = { id: null },
  ): SPSIncomingTransactionsFormGroup {
    const sPSIncomingTransactionsRawValue = this.convertSPSIncomingTransactionsToSPSIncomingTransactionsRawValue({
      ...this.getFormDefaults(),
      ...sPSIncomingTransactions,
    });
    return new FormGroup<SPSIncomingTransactionsFormGroupContent>({
      id: new FormControl(
        { value: sPSIncomingTransactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      messageid: new FormControl(sPSIncomingTransactionsRawValue.messageid, {
        validators: [Validators.maxLength(40)],
      }),
      channelcode: new FormControl(sPSIncomingTransactionsRawValue.channelcode, {
        validators: [Validators.maxLength(12)],
      }),
      callbackurl: new FormControl(sPSIncomingTransactionsRawValue.callbackurl, {
        validators: [Validators.maxLength(100)],
      }),
      messagetype: new FormControl(sPSIncomingTransactionsRawValue.messagetype, {
        validators: [Validators.maxLength(20)],
      }),
      transcurrency: new FormControl(sPSIncomingTransactionsRawValue.transcurrency, {
        validators: [Validators.maxLength(6)],
      }),
      debtorsname: new FormControl(sPSIncomingTransactionsRawValue.debtorsname, {
        validators: [Validators.maxLength(100)],
      }),
      debtorsaccountid: new FormControl(sPSIncomingTransactionsRawValue.debtorsaccountid, {
        validators: [Validators.maxLength(30)],
      }),
      debtorsbankcode: new FormControl(sPSIncomingTransactionsRawValue.debtorsbankcode, {
        validators: [Validators.maxLength(20)],
      }),
      debtorsphone: new FormControl(sPSIncomingTransactionsRawValue.debtorsphone, {
        validators: [Validators.maxLength(20)],
      }),
      beneficiaryname: new FormControl(sPSIncomingTransactionsRawValue.beneficiaryname, {
        validators: [Validators.maxLength(100)],
      }),
      beneficiaryaccountid: new FormControl(sPSIncomingTransactionsRawValue.beneficiaryaccountid, {
        validators: [Validators.maxLength(30)],
      }),
      beneficiarybankcode: new FormControl(sPSIncomingTransactionsRawValue.beneficiarybankcode, {
        validators: [Validators.maxLength(20)],
      }),
      beneficiaryphone: new FormControl(sPSIncomingTransactionsRawValue.beneficiaryphone, {
        validators: [Validators.maxLength(20)],
      }),
      narration: new FormControl(sPSIncomingTransactionsRawValue.narration, {
        validators: [Validators.maxLength(100)],
      }),
      externalreference: new FormControl(sPSIncomingTransactionsRawValue.externalreference, {
        validators: [Validators.maxLength(40)],
      }),
      cbsreference: new FormControl(sPSIncomingTransactionsRawValue.cbsreference, {
        validators: [Validators.maxLength(40)],
      }),
      messageendtoendid: new FormControl(sPSIncomingTransactionsRawValue.messageendtoendid, {
        validators: [Validators.maxLength(40)],
      }),
      transactionstatus: new FormControl(sPSIncomingTransactionsRawValue.transactionstatus, {
        validators: [Validators.maxLength(20)],
      }),
      transactionstatusdesc: new FormControl(sPSIncomingTransactionsRawValue.transactionstatusdesc, {
        validators: [Validators.maxLength(200)],
      }),
      spsstatus: new FormControl(sPSIncomingTransactionsRawValue.spsstatus, {
        validators: [Validators.maxLength(20)],
      }),
      spsstatusdesc: new FormControl(sPSIncomingTransactionsRawValue.spsstatusdesc, {
        validators: [Validators.maxLength(200)],
      }),
      cbsstatus: new FormControl(sPSIncomingTransactionsRawValue.cbsstatus, {
        validators: [Validators.maxLength(20)],
      }),
      cbsstatusdesc: new FormControl(sPSIncomingTransactionsRawValue.cbsstatusdesc, {
        validators: [Validators.maxLength(200)],
      }),
      requestInstanttime: new FormControl(sPSIncomingTransactionsRawValue.requestInstanttime),
      isomessagetype: new FormControl(sPSIncomingTransactionsRawValue.isomessagetype, {
        validators: [Validators.maxLength(20)],
      }),
      requestjson: new FormControl(sPSIncomingTransactionsRawValue.requestjson),
      spsrequestxml: new FormControl(sPSIncomingTransactionsRawValue.spsrequestxml),
      spsresponsexml: new FormControl(sPSIncomingTransactionsRawValue.spsresponsexml),
      amount: new FormControl(sPSIncomingTransactionsRawValue.amount),
    });
  }

  getSPSIncomingTransactions(form: SPSIncomingTransactionsFormGroup): ISPSIncomingTransactions | NewSPSIncomingTransactions {
    return this.convertSPSIncomingTransactionsRawValueToSPSIncomingTransactions(
      form.getRawValue() as SPSIncomingTransactionsFormRawValue | NewSPSIncomingTransactionsFormRawValue,
    );
  }

  resetForm(form: SPSIncomingTransactionsFormGroup, sPSIncomingTransactions: SPSIncomingTransactionsFormGroupInput): void {
    const sPSIncomingTransactionsRawValue = this.convertSPSIncomingTransactionsToSPSIncomingTransactionsRawValue({
      ...this.getFormDefaults(),
      ...sPSIncomingTransactions,
    });
    form.reset(
      {
        ...sPSIncomingTransactionsRawValue,
        id: { value: sPSIncomingTransactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SPSIncomingTransactionsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      requestInstanttime: currentTime,
    };
  }

  private convertSPSIncomingTransactionsRawValueToSPSIncomingTransactions(
    rawSPSIncomingTransactions: SPSIncomingTransactionsFormRawValue | NewSPSIncomingTransactionsFormRawValue,
  ): ISPSIncomingTransactions | NewSPSIncomingTransactions {
    return {
      ...rawSPSIncomingTransactions,
      requestInstanttime: dayjs(rawSPSIncomingTransactions.requestInstanttime, DATE_TIME_FORMAT),
    };
  }

  private convertSPSIncomingTransactionsToSPSIncomingTransactionsRawValue(
    sPSIncomingTransactions: ISPSIncomingTransactions | (Partial<NewSPSIncomingTransactions> & SPSIncomingTransactionsFormDefaults),
  ): SPSIncomingTransactionsFormRawValue | PartialWithRequiredKeyOf<NewSPSIncomingTransactionsFormRawValue> {
    return {
      ...sPSIncomingTransactions,
      requestInstanttime: sPSIncomingTransactions.requestInstanttime
        ? sPSIncomingTransactions.requestInstanttime.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
