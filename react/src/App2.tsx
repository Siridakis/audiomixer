import useWebSocket, { ReadyState } from "react-use-websocket";
import SliderInput from "./Components/SliderInput";
import { useEffect, useState } from "react";
import classes from './App2.module.css'

type VolumeSettings = {
  bootedVolumeSettings: Array<VolumeSetting>;
}

type VolumeSetting = {
  audioKey: string;
  faderVolume: number;
  group: string;
}

export default function App2() {
  const [volume, setVolume] = useState<VolumeSettings>({ bootedVolumeSettings: [] });
  const WS_URL = "ws://localhost:8080"
  const { sendJsonMessage, sendMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )
  // on successful connection send a greeting mesage
  useEffect(() => {
    console.log("Connection state changed")
    if (readyState === ReadyState.OPEN) {
      sendMessage(
        "Hello from App2"
      )
    }
  }, [readyState])
  // log the incoming message
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.data) {
      console.log(`Got a new message:`, lastJsonMessage.data);
      setVolume(lastJsonMessage.data);
    }
  }, [lastJsonMessage])
  // on volume change send a message to the websocket to update the volume
  function handleVolumeChange(key: string, newVolume: number) {
    setVolume((prevState) => {
      const newVolumeSettings = prevState.bootedVolumeSettings.map((item: VolumeSetting) => {
        if (item.audioKey === key) {
          return {
            audioKey: key,
            faderVolume: newVolume / 100,
            group: "UI"
          }
        }
        return item;
      })
      console.log("New Volume Settings", newVolumeSettings);
      sendJsonMessage({
        type: "SET_VOLUME",
        data: {
          audioKey: key,
          faderVolume: newVolume / 100,
        }
      })
      return {
        bootedVolumeSettings: newVolumeSettings
      }
    });
  }

  function handleStateChange(key: string, newVolume: number) {
    setVolume((prevState) => {
      const newVolumeSettings = prevState.bootedVolumeSettings.map((item: VolumeSetting) => {
        if (item.audioKey === key) {
          return {
            audioKey: key,
            faderVolume: newVolume / 100,
            group: "UI"
          }
        }
        return item;
      })
      return {
        bootedVolumeSettings: newVolumeSettings
      }
    });
  }

  return (
    <div className={classes.appBody}>
      <h1>Audio Mixer</h1>
      <div className={classes.mixerGrid}>
      {volume.bootedVolumeSettings.length > 0 &&
        volume.bootedVolumeSettings.map((item: VolumeSetting, index: number) => (
          <SliderInput key={index} label={item.audioKey} value={+(item.faderVolume * 100).toFixed(0)} handleVolumeChange={handleVolumeChange} handleStateChange= {handleStateChange} />
        ))
      }
      </div>
    </div>
  );
}