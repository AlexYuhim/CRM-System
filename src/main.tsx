import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "antd/dist/reset.css";
import "./styles/antd-custom.css";
createRoot(document.getElementById("root") as HTMLElement).render(<App />);
