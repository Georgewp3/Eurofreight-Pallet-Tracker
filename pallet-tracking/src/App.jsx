import { useEffect } from "react";
import HeaderBar from "./components/HeaderBar";
import Toolbar from "./components/Toolbar";
import Table from "./components/Table";
import StatsBar from "./components/StatsBar";
import { usePalletStore } from "./store/usePalletStore";

export default function App() {
  const init = usePalletStore(s => s.init);
  useEffect(() => { init(); }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl p-6 md:p-8 space-y-6">
        <HeaderBar />
        <StatsBar />
        <Table />
        <Toolbar />
        <p className="text-xs text-neutral-500">
          Data persists locally in your browser. Export CSV to share.
        </p>
      </div>
    </div>
  );
}
