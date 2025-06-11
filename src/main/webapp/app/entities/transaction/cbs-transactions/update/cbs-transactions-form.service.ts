import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICBSTransactions, NewCBSTransactions } from '../cbs-transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICBSTransactions for edit and NewCBSTransactionsFormGroupInput for create.
 */
type CBSTransactionsFormGroupInput = ICBSTransactions | PartialWithRequiredKeyOf<NewCBSTransactions>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICBSTransactions | NewCBSTransactions> = Omit<T, 'requestInstanttime'> & {
  requestInstanttime?: string | null;
};

type CBSTransactionsFormRawValue = FormValueOf<ICBSTransactions>;

type NewCBSTransactionsFormRawValue = FormValueOf<NewCBSTransactions>;

type CBSTransactionsFormDefaults = Pick<NewCBSTransactions, 'id' | 'requestInstanttime'>;

type CBSTransactionsFormGroupContent = {
  id: FormControl<CBSTransactionsFormRawValue['id'] | NewCBSTransactions['id']>;
  messageid: FormControl<CBSTransactionsFormRawValue['messageid']>;
  channelcode: FormControl<CBSTransactionsFormRawValue['channelcode']>;
  messagetype: FormControl<CBSTransactionsFormRawValue['messagetype']>;
  transcurrency: FormControl<CBSTransactionsFormRawValue['transcurrency']>;
  debtorsname: FormControl<CBSTransactionsFormRawValue['debtorsname']>;
  debtorsaccountid: FormControl<CBSTransactionsFormRawValue['debtorsaccountid']>;
  debtorsphone: FormControl<CBSTransactionsFormRawValue['debtorsphone']>;
  creditorsname: FormControl<CBSTransactionsFormRawValue['creditorsname']>;
  creditorsaccountid: FormControl<CBSTransactionsFormRawValue['creditorsaccountid']>;
  creditorsphone: FormControl<CBSTransactionsFormRawValue['creditorsphone']>;
  narration: FormControl<CBSTransactionsFormRawValue['narration']>;
  externalreference: FormControl<CBSTransactionsFormRawValue['externalreference']>;
  cbsreference: FormControl<CBSTransactionsFormRawValue['cbsreference']>;
  cbsstatus: FormControl<CBSTransactionsFormRawValue['cbsstatus']>;
  cbsstatusdesc: FormControl<CBSTransactionsFormRawValue['cbsstatusdesc']>;
  requestInstanttime: FormControl<CBSTransactionsFormRawValue['requestInstanttime']>;
  requestjson: FormControl<CBSTransactionsFormRawValue['requestjson']>;
  cbsrequestxml: FormControl<CBSTransactionsFormRawValue['cbsrequestxml']>;
  cbsresponsexml: FormControl<CBSTransactionsFormRawValue['cbsresponsexml']>;
  amount: FormControl<CBSTransactionsFormRawValue['amount']>;
};

export type CBSTransactionsFormGroup = FormGroup<CBSTransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CBSTransactionsFormService {
  createCBSTransactionsFormGroup(cBSTransactions: CBSTransactionsFormGroupInput = { id: null }): CBSTransactionsFormGroup {
    const cBSTransactionsRawValue = this.convertCBSTransactionsToCBSTransactionsRawValue({
      ...this.getFormDefaults(),
      ...cBSTransactions,
    });
    return new FormGroup<CBSTransactionsFormGroupContent>({
      id: new FormControl(
        { value: cBSTransactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      messageid: new FormControl(cBSTransactionsRawValue.messageid, {
        validators: [Validators.maxLength(14)],
      }),
      channelcode: new FormControl(cBSTransactionsRawValue.channelcode, {
        validators: [Validators.maxLength(4)],
      }),
      messagetype: new FormControl(cBSTransactionsRawValue.messagetype, {
        validators: [Validators.maxLength(3)],
      }),
      transcurrency: new FormControl(cBSTransactionsRawValue.transcurrency, {
        validators: [Validators.maxLength(3)],
      }),
      debtorsname: new FormControl(cBSTransactionsRawValue.debtorsname, {
        validators: [Validators.maxLength(100)],
      }),
      debtorsaccountid: new FormControl(cBSTransactionsRawValue.debtorsaccountid, {
        validators: [Validators.maxLength(14)],
      }),
      debtorsphone: new FormControl(cBSTransactionsRawValue.debtorsphone, {
        validators: [Validators.maxLength(14)],
      }),
      creditorsname: new FormControl(cBSTransactionsRawValue.creditorsname, {
        validators: [Validators.maxLength(100)],
      }),
      creditorsaccountid: new FormControl(cBSTransactionsRawValue.creditorsaccountid, {
        validators: [Validators.maxLength(14)],
      }),
      creditorsphone: new FormControl(cBSTransactionsRawValue.creditorsphone, {
        validators: [Validators.maxLength(14)],
      }),
      narration: new FormControl(cBSTransactionsRawValue.narration, {
        validators: [Validators.maxLength(100)],
      }),
      externalreference: new FormControl(cBSTransactionsRawValue.externalreference, {
        validators: [Validators.maxLength(40)],
      }),
      cbsreference: new FormControl(cBSTransactionsRawValue.cbsreference, {
        validators: [Validators.maxLength(40)],
      }),
      cbsstatus: new FormControl(cBSTransactionsRawValue.cbsstatus, {
        validators: [Validators.maxLength(10)],
      }),
      cbsstatusdesc: new FormControl(cBSTransactionsRawValue.cbsstatusdesc, {
        validators: [Validators.maxLength(200)],
      }),
      requestInstanttime: new FormControl(cBSTransactionsRawValue.requestInstanttime),
      requestjson: new FormControl(cBSTransactionsRawValue.requestjson),
      cbsrequestxml: new FormControl(cBSTransactionsRawValue.cbsrequestxml),
      cbsresponsexml: new FormControl(cBSTransactionsRawValue.cbsresponsexml),
      amount: new FormControl(cBSTransactionsRawValue.amount),
    });
  }

  getCBSTransactions(form: CBSTransactionsFormGroup): ICBSTransactions | NewCBSTransactions {
    return this.convertCBSTransactionsRawValueToCBSTransactions(
      form.getRawValue() as CBSTransactionsFormRawValue | NewCBSTransactionsFormRawValue,
    );
  }

  resetForm(form: CBSTransactionsFormGroup, cBSTransactions: CBSTransactionsFormGroupInput): void {
    const cBSTransactionsRawValue = this.convertCBSTransactionsToCBSTransactionsRawValue({ ...this.getFormDefaults(), ...cBSTransactions });
    form.reset(
      {
        ...cBSTransactionsRawValue,
        id: { value: cBSTransactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CBSTransactionsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      requestInstanttime: currentTime,
    };
  }

  private convertCBSTransactionsRawValueToCBSTransactions(
    rawCBSTransactions: CBSTransactionsFormRawValue | NewCBSTransactionsFormRawValue,
  ): ICBSTransactions | NewCBSTransactions {
    return {
      ...rawCBSTransactions,
      requestInstanttime: dayjs(rawCBSTransactions.requestInstanttime, DATE_TIME_FORMAT),
    };
  }

  private convertCBSTransactionsToCBSTransactionsRawValue(
    cBSTransactions: ICBSTransactions | (Partial<NewCBSTransactions> & CBSTransactionsFormDefaults),
  ): CBSTransactionsFormRawValue | PartialWithRequiredKeyOf<NewCBSTransactionsFormRawValue> {
    return {
      ...cBSTransactions,
      requestInstanttime: cBSTransactions.requestInstanttime ? cBSTransactions.requestInstanttime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
