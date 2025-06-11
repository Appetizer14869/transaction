import dayjs from 'dayjs/esm';

import { ISPSIncomingTransactions, NewSPSIncomingTransactions } from './sps-incoming-transactions.model';

export const sampleWithRequiredData: ISPSIncomingTransactions = {
  id: 30363,
};

export const sampleWithPartialData: ISPSIncomingTransactions = {
  id: 24084,
  messageid: 'sideboard',
  channelcode: 'alive whenev',
  debtorsname: 'dirty',
  debtorsaccountid: 'geez cross',
  debtorsphone: 'floss',
  beneficiaryname: 'sheepishly materialise',
  beneficiarybankcode: 'against whose champi',
  beneficiaryphone: 'upset vastly',
  externalreference: 'whoa',
  cbsreference: 'furthermore impolite symbolise',
  transactionstatusdesc: 'lonely ah parched',
  spsstatus: 'happy',
  spsstatusdesc: 'along correctly',
  cbsstatus: 'yuck so',
  requestInstanttime: dayjs('2025-06-11T06:39'),
  isomessagetype: 'till broadly masculi',
  requestjson: 'affiliate',
  spsresponsexml: 'geez',
  amount: 4463.53,
};

export const sampleWithFullData: ISPSIncomingTransactions = {
  id: 13037,
  messageid: 'minty phew whether',
  channelcode: 'supposing',
  callbackurl: 'dearly',
  messagetype: 'across how fatally',
  transcurrency: 'geez s',
  debtorsname: 'likely',
  debtorsaccountid: 'violin dusk anxiously',
  debtorsbankcode: 'squirm wordy',
  debtorsphone: 'instead inasmuch',
  beneficiaryname: 'crank',
  beneficiaryaccountid: 'mundane pish',
  beneficiarybankcode: 'publication lobotomi',
  beneficiaryphone: 'babyish by traffic',
  narration: 'humble',
  externalreference: 'sweetly',
  cbsreference: 'drab',
  messageendtoendid: 'playfully',
  transactionstatus: 'artistic order unwri',
  transactionstatusdesc: 'whose plus',
  spsstatus: 'fooey avalanche wher',
  spsstatusdesc: 'broadcast individual',
  cbsstatus: 'daily',
  cbsstatusdesc: 'finally',
  requestInstanttime: dayjs('2025-06-10T20:24'),
  isomessagetype: 'tune-up',
  requestjson: 'boo',
  spsrequestxml: 'once overheard',
  spsresponsexml: 'helpfully neat',
  amount: 18350.44,
};

export const sampleWithNewData: NewSPSIncomingTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
