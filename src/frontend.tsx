/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { LimitProvider } from "./providers/limit-provider";

const elem = document.getElementById("root")!;
const app = (
	<StrictMode>
		<BrowserRouter>
			<LimitProvider>
				<TooltipProvider>
					<App />
				</TooltipProvider>
			</LimitProvider>
			<Toaster position="top-center" />
		</BrowserRouter>
	</StrictMode>
);

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
(import.meta.hot.data.root ??= createRoot(elem)).render(app);
