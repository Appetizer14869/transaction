import { ISPSParticipatingCodes, NewSPSParticipatingCodes } from './sps-participating-codes.model';

export const sampleWithRequiredData: ISPSParticipatingCodes = {
  id: 18586,
};

export const sampleWithPartialData: ISPSParticipatingCodes = {
  id: 27311,
  biccode: 'supposin',
  bicname: 'carefree',
  bicstatus: 'flimsy hou',
};

export const sampleWithFullData: ISPSParticipatingCodes = {
  id: 29768,
  biccode: 'shakily',
  bicname: 'deliberately',
  bicstatus: 'till defia',
};

export const sampleWithNewData: NewSPSParticipatingCodes = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
