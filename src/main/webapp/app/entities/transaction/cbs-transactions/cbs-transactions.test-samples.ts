import dayjs from 'dayjs/esm';

import { ICBSTransactions, NewCBSTransactions } from './cbs-transactions.model';

export const sampleWithRequiredData: ICBSTransactions = {
  id: 6559,
};

export const sampleWithPartialData: ICBSTransactions = {
  id: 5073,
  messageid: 'overtrain plai',
  channelcode: 'aha',
  messagetype: 'abn',
  debtorsphone: 'happy',
  creditorsaccountid: 'into',
  narration: 'weird',
  cbsstatus: 'capsize yo',
};

export const sampleWithFullData: ICBSTransactions = {
  id: 17576,
  messageid: 'minister enric',
  channelcode: 'er',
  messagetype: 'arr',
  transcurrency: 'pos',
  debtorsname: 'pfft',
  debtorsaccountid: 'pfft a',
  debtorsphone: 'thorough',
  creditorsname: 'hence spotless',
  creditorsaccountid: 'industrialize',
  creditorsphone: 'upon ravage',
  narration: 'modulo separate',
  externalreference: 'acquaintance blah',
  cbsreference: 'ornery unless',
  cbsstatus: 'ick',
  cbsstatusdesc: 'why scratch greedily',
  requestInstanttime: dayjs('2025-06-11T06:15'),
  requestjson: 'while',
  cbsrequestxml: 'where unnecessarily remark',
  cbsresponsexml: 'reluctantly blah',
  amount: 10811.43,
};

export const sampleWithNewData: NewCBSTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
