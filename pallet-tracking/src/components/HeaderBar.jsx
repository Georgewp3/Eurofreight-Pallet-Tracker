import { useEffect } from "react";
import { usePalletStore } from "../store/usePalletStore";
import { weekOfYear } from "../utils/weekOfYear";

export default function HeaderBar() {
    const { meta, setMeta } = usePalletStore();

    useEffect(() => {
        if (!meta.week) {
            const w = weekOfYear(new Date(meta.date));
            setMeta({ week: String(w) });
        }
    }, [meta.date]);

    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Pallet Tracking</h1>
                <p className="text-sm text-neutral-500">Eurofreight • Larnaca Unit</p>
            </div>
            <div className="grid grid-cols-2 md:flex gap-3">
                <label className="flex flex-col text-sm">
                    <span className="text-neutral-500">Date</span>
                    <input
                        type="date"
                        value={meta.date}
                        onChange={(e) => setMeta({ date: e.target.value })}
                        className="rounded-xl border border-neutral-300 px-3 py-2 bg-white shadow-sm"
                    />
                </label>
                <label className="flex flex-col text-sm">
                    <span className="text-neutral-500">Week</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={meta.week}
                        onChange={(e) => setMeta({ week: e.target.value })}
                        className="rounded-xl border border-neutral-300 px-3 py-2 bg-white shadow-sm"
                        placeholder="e.g. 49"
                    />
                </label>
                <label className="col-span-2 md:col-span-1 flex flex-col text-sm">
                    <span className="text-neutral-500">Container ID</span>
                    <input
                        type="text"
                        value={meta.containerId}
                        onChange={(e) => setMeta({ containerId: e.target.value })}
                        className="rounded-xl border border-neutral-300 px-3 py-2 bg-white shadow-sm"
                        placeholder="e.g. MSKU1234567"
                    />
                </label>
            </div>
        </div>
    );
}
