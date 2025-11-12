import { usePalletStore } from "../store/usePalletStore";
import Row from "./Row";

export default function Table() {
    const rows = usePalletStore((s) => s.rows);

    return (
        <div className="overflow-auto rounded-2xl border border-neutral-200 shadow-sm">
            <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-neutral-100 text-neutral-700">
                    <tr>
                        <th className="text-left py-3 px-3 font-semibold">Category / SKU</th>

                        <th className="w-24 text-center font-semibold">Loose</th>
                        <th className="w-24 text-center"></th>
                        <th className="w-24 text-center"></th>

                        <th className="w-24 text-center font-semibold">Manual</th>
                        <th className="w-24 text-center"></th>
                        <th className="w-24 text-center"></th>

                        <th className="w-24 text-center font-semibold">Auto Total</th>
                        <th className="w-20 text-center font-semibold">Check</th>
                        <th className="w-24 text-center font-semibold">Auto</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((r) => (
                        <Row key={r.id} row={r} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
