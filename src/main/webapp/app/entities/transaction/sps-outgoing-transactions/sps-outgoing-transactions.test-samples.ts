import dayjs from 'dayjs/esm';

import { ISPSOutgoingTransactions, NewSPSOutgoingTransactions } from './sps-outgoing-transactions.model';

export const sampleWithRequiredData: ISPSOutgoingTransactions = {
  id: 23592,
};

export const sampleWithPartialData: ISPSOutgoingTransactions = {
  id: 4770,
  channelcode: 'boo opposite',
  callbackurl: 'webbed puzzled',
  messagetype: 'cap timely',
  debtorsname: 'for',
  debtorsphone: 'icy off swift',
  beneficiaryname: 'solicit qua',
  beneficiaryaccountid: 'airbus',
  beneficiarybankcode: 'tomorrow hm',
  externalreference: 'abaft',
  messageendtoendid: 'boo print',
  transactionstatusdesc: 'whenever including minister',
  spsstatus: 'fooey soggy',
  requestInstanttime: dayjs('2025-06-11T02:21'),
};

export const sampleWithFullData: ISPSOutgoingTransactions = {
  id: 8681,
  messageid: 'juggernaut',
  channelcode: 'now gadzooks',
  callbackurl: 'that prudent',
  messagetype: 'who',
  transcurrency: 'how for',
  debtorsname: 'provided',
  debtorsaccountid: 'mmm',
  debtorsbankcode: 'snuggle',
  debtorsphone: 'collaboration',
  beneficiaryname: 'given around',
  beneficiaryaccountid: 'of tabulate',
  beneficiarybankcode: 'oh last stratify',
  beneficiaryphone: 'twin',
  narration: 'bah fly pack',
  externalreference: 'from',
  cbsreference: 'colorfully astride',
  messageendtoendid: 'er',
  transactionstatus: 'gah provision till',
  transactionstatusdesc: 'napkin from',
  spsstatus: 'overdue where yahoo',
  spsstatusdesc: 'reproachfully wallop',
  cbsstatus: 'mmm',
  cbsstatusdesc: 'familiar dishonor',
  requestInstanttime: dayjs('2025-06-11T09:09'),
  isomessagetype: 'unimpressively slight excited',
  requestjson: 'shrilly',
  spsrequestxml: 'eek',
  spsresponsexml: 'provided yuck',
  amount: 23384.21,
  callbackstatus: 'lest than',
  callbackstatusdesc: 'subexpression ceramic',
};

export const sampleWithNewData: NewSPSOutgoingTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
