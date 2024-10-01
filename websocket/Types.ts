export enum CustomEventTypes {
  INIT_VOLUME_SETTINGS = 'INITIALIZE_VOLUME_SETTINGS',
  SET_VOLUME= 'SET_VOLUME',
  SET_GLOBAL_VOLUME_STATE= 'SET_GLOBAL_VOLUME_STATE',
  UPDATED_VOLUME_SETTINGS= 'UPDATED_VOLUME_SETTINGS',
  SERVER_STATE= 'SERVER_STATE'
};

export type VolumeSetting = {
  audioKey: string;
  faderVolume: number;
  group: string;
}

export type EventData = Array<VolumeSetting>;
