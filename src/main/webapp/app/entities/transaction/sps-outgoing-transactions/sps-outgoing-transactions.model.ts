import dayjs from 'dayjs/esm';

export interface ISPSOutgoingTransactions {
  id: number;
  messageid?: string | null;
  channelcode?: string | null;
  callbackurl?: string | null;
  messagetype?: string | null;
  transcurrency?: string | null;
  debtorsname?: string | null;
  debtorsaccountid?: string | null;
  debtorsbankcode?: string | null;
  debtorsphone?: string | null;
  beneficiaryname?: string | null;
  beneficiaryaccountid?: string | null;
  beneficiarybankcode?: string | null;
  beneficiaryphone?: string | null;
  narration?: string | null;
  externalreference?: string | null;
  cbsreference?: string | null;
  messageendtoendid?: string | null;
  transactionstatus?: string | null;
  transactionstatusdesc?: string | null;
  spsstatus?: string | null;
  spsstatusdesc?: string | null;
  cbsstatus?: string | null;
  cbsstatusdesc?: string | null;
  requestInstanttime?: dayjs.Dayjs | null;
  isomessagetype?: string | null;
  requestjson?: string | null;
  spsrequestxml?: string | null;
  spsresponsexml?: string | null;
  amount?: number | null;
  callbackstatus?: string | null;
  callbackstatusdesc?: string | null;
}

export type NewSPSOutgoingTransactions = Omit<ISPSOutgoingTransactions, 'id'> & { id: null };
