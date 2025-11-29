import PresetHolder from "./components/presets/PresetHolder";
import Panel from "./components/Panel";
import { RefreshProvider } from "./context/RefreshContext";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col select-none">
      <main className="flex-1 bg-nero-900 flex items-center justify-start">
        <RefreshProvider>
          <PresetHolder />
          <Panel />
        </RefreshProvider>
      </main>
    </div>
  );
}
