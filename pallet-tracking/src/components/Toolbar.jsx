import { usePalletStore } from "../store/usePalletStore";

export default function Toolbar() {
    const { exportCsv, resetAll } = usePalletStore();
    return (
        <div className="flex flex-wrap items-center gap-3">
            <button
                onClick={exportCsv}
                className="rounded-2xl px-4 py-2 bg-brand-600 text-white font-medium shadow hover:bg-brand-700"
            >Export CSV</button>

            <button
                onClick={resetAll}
                className="rounded-2xl px-4 py-2 bg-red-600 text-white font-medium shadow hover:bg-red-700"
            >Delete Entries</button>
        </div>
    );
}
