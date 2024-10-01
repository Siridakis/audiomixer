import { CustomEventTypes } from "./Types";

export async function bootAudioMixerServer(AudioMixer: any, AudioHandler: any) {
  console.log('$ WS audioServer boot');
  const socket = new WebSocket('ws://localhost:8080');
  try {
    socket.addEventListener('open', () => {
      const initialSetting = { type: CustomEventTypes.INIT_VOLUME_SETTINGS, data: AudioMixer.getTracks() };
      socket.send(JSON.stringify(initialSetting));
      console.log('sent initial setting');
    });
    // Event listener for when a message is received from the server
    socket.addEventListener('message', (event) => {
      const parsedEvent = JSON.parse(event.data);
      if (parsedEvent.type === CustomEventTypes.SERVER_STATE) {
        console.log('[UPDATE EVENT] Update volume settings received by the audio server', parsedEvent.data);
        // Call AudioHandler.volumeControl passing in the trackName and update volume. This will immediately change the volume of the track in the game
        // Update game's volume settings object. This volume will be used when AudioHandler.play is called the next time.
        parsedEvent.data.bootedVolumeSettings.forEach((element: any) => {
          const { audioKey, faderVolume } = element;
          AudioMixer.setTrackVolume(element);
          AudioHandler.volumeControl(audioKey, faderVolume, 0.1);
          console.log('audioKey,volume', audioKey, faderVolume);
        });
      }
    });
    // Event listener for when the connection is closed
    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });
    // Event listener for when an error occurs
    socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });
  } catch (error) {
    console.error('$ WS audioServer boot', error);
  }
}