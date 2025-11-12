import { usePalletStore } from "../store/usePalletStore";
import clsx from "clsx";

export default function Row({ row }) {
    if (row.type === "cat") return <CategoryRow row={row} />;
    return <SkuRow row={row} />;
}

function CategoryRow({ row }) {
    const { inc } = usePalletStore();
    const isMix = row.id === "cat-mix"; // this row shows the right-side grey headers

    return (
        <tr>
            <td className="cell-left">{row.label}</td>
            <td className="cell-num">{row.count}</td>
            <td className="cell-num">
                <GreenBtn onClick={() => inc(row.id, "count", -1)}>-1</GreenBtn>
            </td>
            <td className="cell-num">
                <GreenBtn onClick={() => inc(row.id, "count", +1)}>+1</GreenBtn>
            </td>

            {/* Right side: empty for normal categories; subheaders for MIX */}
            {isMix ? (
                <>
                    <td className="subhead">LOOSE BOXES</td>
                    <td className="subhead">MANUAL</td>
                    <td className="subhead">AUTO TOTAL</td>
                    <td className="subhead">CHECK</td>
                    <td className="subhead">AUTO</td>
                </>
            ) : (
                <td colSpan={5}></td>
            )}
        </tr>
    );
}

function SkuRow({ row }) {
    const { inc, toggleCheck } = usePalletStore();
    const autoTotal = row.looseBoxes;
    const ok = Number(row.manual) === Number(autoTotal);

    return (
        <tr>
            <td className="cell-left">{row.label}</td>

            {/* Left Count / -1 / +1 cells are present but disabled for SKU rows (as in screenshot) */}
            <td className="cell-num">0</td>
            <td className="cell-num"><GreenBtn disabled>-1</GreenBtn></td>
            <td className="cell-num"><GreenBtn disabled>+1</GreenBtn></td>

            <td className="cell-num">{row.looseBoxes}</td>

            <td className="cell-num btns">
                <GreenBtn onClick={() => inc(row.id, "manual", -1)}>-1</GreenBtn>
                <GreenBtn onClick={() => inc(row.id, "manual", +1)}>+1</GreenBtn>
            </td>

            <td className="cell-num">{autoTotal}</td>

            <td className="cell-num">
                <input
                    type="checkbox"
                    checked={row.check}
                    onChange={() => toggleCheck(row.id)}
                />
            </td>

            <td className={clsx("cell-num status", ok ? "ok" : "fault")}>
                {ok ? "OK" : "FAULT"}
            </td>
        </tr>
    );
}

function GreenBtn({ children, onClick, disabled }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={clsx("gbtn", disabled && "gbtn-disabled")}
        >
            {children}
        </button>
    );
}
