export interface ISPSParticipatingCodes {
  id: number;
  biccode?: string | null;
  bicname?: string | null;
  bicstatus?: string | null;
}

export type NewSPSParticipatingCodes = Omit<ISPSParticipatingCodes, 'id'> & { id: null };
