import { useMemo } from "react";
import { usePalletStore } from "../store/usePalletStore";

export default function StatsBar() {
    const rows = usePalletStore(s => s.rows);
    const stats = useMemo(() => {
        const loose = rows.reduce((a, r) => a + (r.looseBoxes || 0), 0);
        const manual = rows.reduce((a, r) => a + (r.manual || 0), 0);
        const faults = rows.filter(r => (r.manual || 0) !== (r.looseBoxes || 0)).length;
        return { loose, manual, faults };
    }, [rows]);

    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-neutral-200 p-4 bg-white shadow-sm">
                <div className="text-sm text-neutral-500">Total Loose</div>
                <div className="text-2xl font-semibold">{stats.loose}</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4 bg-white shadow-sm">
                <div className="text-sm text-neutral-500">Total Manual</div>
                <div className="text-2xl font-semibold">{stats.manual}</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4 bg-white shadow-sm">
                <div className="text-sm text-neutral-500">Fault Rows</div>
                <div className="text-2xl font-semibold">{stats.faults}</div>
            </div>
        </div>
    );
}
