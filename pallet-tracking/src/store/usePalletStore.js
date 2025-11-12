import { create } from "zustand";
import { defaultRows } from "../data/defaultRows";

const STORAGE_KEY = "eurofreight:pallet-tracking:v1";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
};
const save = (state) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

export const usePalletStore = create((set, get) => ({
  meta: {
    date: new Date().toISOString().slice(0, 10),
    containerId: "",
    week: "",
  },
  rows: load()?.rows || defaultRows,
  metaLoaded: false,

  init: () => {
    const persisted = load();
    if (persisted) set({ ...persisted, metaLoaded: true });
    else set({ metaLoaded: true });
  },

  setMeta: (patch) =>
    set((s) => {
      const next = { ...s, meta: { ...s.meta, ...patch } };
      save({ rows: next.rows, meta: next.meta });
      return next;
    }),

  inc: (id, field, delta) =>
    set((s) => {
      const rows = s.rows.map((r) =>
        r.id === id
          ? { ...r, [field]: Math.max(0, (r[field] ?? 0) + delta) }
          : r
      );
      const next = { ...s, rows };
      save({ rows, meta: s.meta });
      return next;
    }),

  toggleCheck: (id) =>
    set((s) => {
      const rows = s.rows.map((r) =>
        r.id === id ? { ...r, check: !r.check } : r
      );
      const next = { ...s, rows };
      save({ rows, meta: s.meta });
      return next;
    }),

  resetAll: () =>
    set((s) => {
      const cleared = s.rows.map((r) => ({
        ...r,
        looseBoxes: 0,
        manual: 0,
        check: false,
      }));
      const next = { ...s, rows: cleared };
      save({ rows: cleared, meta: s.meta });
      return next;
    }),

  exportCsv: () => {
    const { rows, meta } = get();
    const header = [
      "Date",
      "Week",
      "ContainerID",
      "Label",
      "Type",
      "LooseBoxes",
      "Manual",
      "AutoTotal",
      "Check",
      "Status",
    ];
    const lines = [header.join(",")];
    rows.forEach((r) => {
      const auto = r.looseBoxes; // define “AUTO TOTAL” as loose boxes column
      const status = r.manual === auto ? "OK" : "FAULT";
      lines.push(
        [
          meta.date,
          meta.week,
          meta.containerId,
          `"${r.label}"`,
          r.type,
          r.looseBoxes,
          r.manual,
          auto,
          r.check ? "YES" : "NO",
          status,
        ].join(",")
      );
    });
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pallet-tracking_${meta.date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },
}));
