import { usePalletStore } from "../store/usePalletStore";
import clsx from "clsx";

export default function Row({ row }) {
    const { inc, toggleCheck } = usePalletStore();
    const autoTotal = row.looseBoxes;               // define auto = loose boxes
    const statusOk = row.manual === autoTotal;

    const CellBtn = ({ onClick, children }) => (
        <button
            onClick={onClick}
            className="rounded-xl bg-neutral-100 hover:bg-neutral-200 px-3 py-1 text-sm font-semibold shadow-inner"
        >{children}</button>
    );

    return (
        <tr className="border-b border-neutral-200 hover:bg-neutral-50">
            <td className="py-3 px-3 text-sm font-medium text-neutral-800">{row.label}</td>

            <td className="text-center">{row.looseBoxes}</td>
            <td className="text-center"><CellBtn onClick={() => inc(row.id, "looseBoxes", -1)}>-1</CellBtn></td>
            <td className="text-center"><CellBtn onClick={() => inc(row.id, "looseBoxes", +1)}>+1</CellBtn></td>

            <td className="text-center">{row.manual}</td>
            <td className="text-center"><CellBtn onClick={() => inc(row.id, "manual", -1)}>-1</CellBtn></td>
            <td className="text-center"><CellBtn onClick={() => inc(row.id, "manual", +1)}>+1</CellBtn></td>

            <td className="text-center">{autoTotal}</td>

            <td className="text-center">
                <input
                    type="checkbox"
                    checked={row.check}
                    onChange={() => toggleCheck(row.id)}
                    className="h-4 w-4"
                />
            </td>

            <td className={clsx("text-center font-semibold", statusOk ? "text-emerald-600" : "text-red-600")}>
                {statusOk ? "OK" : "FAULT"}
            </td>
        </tr>
    );
}
