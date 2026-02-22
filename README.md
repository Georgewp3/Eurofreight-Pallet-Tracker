# Eurofreight Pallet Tracker

A lightweight, single-page web app for tracking pallet counts by SKU with instant math, validation status, and one-click CSV export. Data is stored per date in your browser’s `localStorage` — no server, no signup.

**Live site:** https://georgewp3.github.io/Eurofreight-Pallet-Tracker/

---

## Features

- **Per-date tracking** — switch the `DATE` field and each day has its own saved state.
- **Fast entry** — green **+1 / −1** buttons for the left **Count** column.
- **Loose Boxes control** — click the number to type a value, or use the **MANUAL** ± buttons (they update Loose Boxes).
- **Auto Total** — computed as **Count + Loose Boxes** for each SKU row.
- **Status check** — tick **CHECK** to mark a row as **OK** (unticked shows **FAULT**).
- **CSV Export** — one click to download a dated CSV for the current page state.
- **Persistent** — everything is saved locally via `localStorage` (per date).
- **Responsive, modern UI** — dark, high-contrast, keyboard-focusable controls.

---

## Data model (per date)

Stored in `localStorage` under the key `pallet-tracking-v1`:

- `counts[category]` — left “Count” value (number).
- `loose[sku]` — “Loose Boxes” value (number).
- `check[sku]` — checkbox state (boolean).
- `week` — free-text/number field.
- `container` — container ID.

**Auto Total = Count + Loose Boxes** (for SKU rows).

**Note:** Top categories (LOOSE, EURO, etc.) don’t have right-side fields; their Auto Total isn’t exported (Count only).

---

## CSV schema


- For top categories: `Loose Boxes = 0`, `Auto Total = Count`, `Checked` and `Auto` are empty.
- For SKUs: `Checked = TRUE/FALSE`, `Auto = OK/FAULT` (OK only when the checkbox is ticked).

A UTF-8 BOM (`\uFEFF`) is included so Excel opens it cleanly.

---

## Usage

1. Open the live page:  
   **https://georgewp3.github.io/Eurofreight-Pallet-Tracker/**
2. Set **DATE**, **WEEK**, and **CONTAINER ID**.
3. Use **−1 / +1** to change the **Count**.
4. Set **Loose Boxes** by clicking the number or using **MANUAL −1 / +1**.
5. Tick **CHECK** to mark the row **OK**.
6. Click **EXPORT CSV** to download the day’s data.
7. **DELETE ENTRIES** clears the **current date** only.




The **EXPORT CSV** button produces a file named `pallet-tracking_YYYY-MM-DD.csv` 

