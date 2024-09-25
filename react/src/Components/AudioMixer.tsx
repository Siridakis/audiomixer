import { Key, useEffect, useState } from "react";
import SliderInput from "./SliderInput.tsx";

const VolumeSettings = {
	Groups: [
		{
			key: "master_fader",
			volume: 1,
			fader: "MasterFader",
		},
		{
			key: "sfx_fader",
			volume: 1,
			fader: "SFXFader",
		},
		{
			key: "ui_fader",
			volume: 1,
			fader: "UIFader",
		},
	],
	UI: [
		{
			key: "boost_button",
			volume: 1,
			fader: "UI",
		},
		{
			key: "spin_button",
			volume: 0.6,
			fader: "UI",
		},
	],
	Music: [
		{
			key: "main_game_bgm",
			volume: 0.8,
			fader: "Music",
		},
		{
			key: "free_spins_bgm",
			volume: 0.3,
			fader: "Music",
		},
	],
};

export default function AudioMixer(updateVolume: any, volumeSettings: any) {
    const [mixerVolumeSettings, setMixerVolumeSettings] = useState(volumeSettings);
    useEffect(() => {
        console.log("AudioMixer mounted", mixerVolumeSettings);
        setMixerVolumeSettings(volumeSettings);
        console.log("AudioMixer mounted after", mixerVolumeSettings);
    }, [volumeSettings]);
    return (
		<div>
			<h2>AudioMixer</h2>
			{Object.keys(mixerVolumeSettings).map((fader) => (
				<div key={fader}>
					<h3>{fader} Fader</h3>
					{/* @ts-ignore */}
					{mixerVolumeSettings[fader].map(
						(element: {
							key: Key | null | undefined;
							volume: number;
						}) => (
							<div key={element.key}>
								<SliderInput
									label={element.key}
									value={element.volume * 100}
									updateVolume={updateVolume}
									volumeSettings={mixerVolumeSettings}
								/>
							</div>
						),
					)}
				</div>
			))}
		</div>
	);
}
