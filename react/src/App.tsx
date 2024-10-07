import useWebSocket, { ReadyState } from 'react-use-websocket';
import SliderInput from './Components/SliderInput';
import { useEffect, useState } from 'react';
import classes from './App.module.css';
import { Button, Flex } from '@mantine/core';

type VolumeSettings = {
  bootedVolumeSettings: Array<VolumeSetting>;
};

type VolumeSetting = {
  audioKey: string;
  faderVolume: number;
  group: string;
};

export default function App() {
  const [volume, setVolume] = useState<VolumeSettings>({ bootedVolumeSettings: [] });
  const WS_URL = 'ws://localhost:8080';
  const { sendJsonMessage, sendMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });
  // on successful connection send greeting message
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log('Connection state changed');
    if (readyState === ReadyState.OPEN) {
      sendMessage('Hello from Client');
    }
  }, [readyState]);
  // log the incoming message
  useEffect(() => {
    if (lastJsonMessage?.data) {
      console.log('Got a new message:', lastJsonMessage.data);
      setVolume(lastJsonMessage.data);
    }
  }, [lastJsonMessage]);
  // on volume change send a message to the websocket to update the volume
  function handleVolumeChange(key: string, newVolume: number) {
    setVolume((prevState) => {
      const newVolumeSettings = prevState.bootedVolumeSettings.map((item: VolumeSetting) => {
        if (item.audioKey === key) {
          return {
            audioKey: key,
            faderVolume: newVolume / 100,
            group: 'UI',
          };
        }
        return item;
      });
      console.log('New Volume Settings', newVolumeSettings);
      sendJsonMessage({
        type: 'SET_VOLUME',
        data: {
          audioKey: key,
          faderVolume: newVolume / 100,
        },
      });
      return {
        bootedVolumeSettings: newVolumeSettings,
      };
    });
  }

  function handleStateChange(key: string, newVolume: number) {
    setVolume((prevState) => {
      const newVolumeSettings = prevState.bootedVolumeSettings.map((item: VolumeSetting) => {
        if (item.audioKey === key) {
          return {
            audioKey: key,
            faderVolume: newVolume / 100,
            group: 'UI',
          };
        }
        return item;
      });
      return {
        bootedVolumeSettings: newVolumeSettings,
      };
    });
  }

  function handleExportConfig() {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(volume, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'volume-settings.json';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className={classes.appBody}>
      <Flex justify={'space-between'} align={'center'}>
        <h1>Audio Mixer</h1>
        <Button color="green" onClick={() => handleExportConfig()}>
          Export Config
        </Button>
      </Flex>
      <div className={classes.mixerGrid}>
        {volume.bootedVolumeSettings.length > 0 &&
          volume.bootedVolumeSettings.map((item: VolumeSetting) => (
            <SliderInput
              key={item.audioKey}
              label={item.audioKey}
              value={+(item.faderVolume * 100).toFixed(0)}
              handleVolumeChange={handleVolumeChange}
              handleStateChange={handleStateChange}
            />
          ))}
      </div>
    </div>
  );
}
