import { useEffect, useState } from "react";
import AudioMixer from "./Components/AudioMixer";

function App(socket: any) {
	const [volumeSettings, setVolumeSettings] = useState(null);

	function updateVolumeSettings(newVolumeSettings: any) {
		setVolumeSettings(newVolumeSettings);
		socket.send(JSON.stringify(newVolumeSettings));
	}

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");
		socket.addEventListener("open", () => {
			console.log("WebSocket connection established");
		});
		socket.addEventListener("message", (event: { data: any }) => {
			console.log("Received message:", event.data);
			setVolumeSettings(JSON.parse(event.data));
		});
		socket.addEventListener("close", () => {
			console.log("WebSocket connection closed");
		});
		socket.addEventListener("error", (error: any) => {
			console.error("WebSocket error:", error);
		});
	}, []);

  useEffect(() => {
    console.log("App mounted", volumeSettings);
    
  }, [volumeSettings]);

	return (
		<AudioMixer
			updateVolume={updateVolumeSettings}
			volumeSettings={volumeSettings}
		/>
	);
}

export default App;
