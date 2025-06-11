import dayjs from 'dayjs/esm';

export interface ICBSTransactions {
  id: number;
  messageid?: string | null;
  channelcode?: string | null;
  messagetype?: string | null;
  transcurrency?: string | null;
  debtorsname?: string | null;
  debtorsaccountid?: string | null;
  debtorsphone?: string | null;
  creditorsname?: string | null;
  creditorsaccountid?: string | null;
  creditorsphone?: string | null;
  narration?: string | null;
  externalreference?: string | null;
  cbsreference?: string | null;
  cbsstatus?: string | null;
  cbsstatusdesc?: string | null;
  requestInstanttime?: dayjs.Dayjs | null;
  requestjson?: string | null;
  cbsrequestxml?: string | null;
  cbsresponsexml?: string | null;
  amount?: number | null;
}

export type NewCBSTransactions = Omit<ICBSTransactions, 'id'> & { id: null };
