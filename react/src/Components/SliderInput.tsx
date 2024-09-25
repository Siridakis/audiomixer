import { NumberInput, Slider } from "@mantine/core";
import classes from "./SliderInput.module.css";

export default function SliderInput(props: any) {
  function updateVolume(newVolume: string | number) {
    if (typeof newVolume === "string") {
      newVolume = parseInt(newVolume);
    }
    props.handleVolumeChange(props.label, newVolume);
  }

  function updateState(newVolume: string | number) {
    if (typeof newVolume === "string") {
      newVolume = parseInt(newVolume);
    }
    props.handleStateChange(props.label, newVolume);
  }
  
  return (
    <div className={classes.wrapper}>
      <NumberInput
        value={props.value}
        onChange={updateVolume}
        label={props.label}
        placeholder="Values from 0 to 100"
        step={1}
        min={0}
        max={100}
        hideControls
        classNames={{ input: classes.input, label: classes.label }}
      />
      <Slider
        onChangeEnd={updateVolume}
        onDrag={()=>{console.log("drag")}}
        max={100}
        step={1}
        min={0}
        label={null}
        value={typeof props.value === "string" ? 0 : props.value}
        onChange={updateState}
        size={2}
        className={classes.slider}
        classNames={classes}
      />
    </div>
  );
}
