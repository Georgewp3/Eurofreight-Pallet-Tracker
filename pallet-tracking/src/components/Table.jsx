import { usePalletStore } from "../store/usePalletStore";
import Row from "./Row";

export default function Table() {
    const rows = usePalletStore((s) => s.rows);

    return (
        <div className="table-wrap">
            <table className="pt-table">
                <thead>
                    <tr>
                        <th className="th-left">Category</th>
                        <th>Count</th>
                        <th className="thin">-1</th>
                        <th className="thin">+1</th>
                        {/* spacer across to line up the right-hand grey subheader row */}
                        <th colSpan={5}></th>
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
