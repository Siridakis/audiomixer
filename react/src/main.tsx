import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import App2 from "./App2.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MantineProvider>
			{/* <App/> */}
			<App2 />
		</MantineProvider>
	</StrictMode>,
);
