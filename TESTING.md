# Sales Tracker — Test Checklist

## Formula spot-checks (required)

### T1. Incentive slab — Bennivair example (from spec)
- Set product **Bennivair 0.8/1.6**: Target = 100, Till date sale = 100, Till date return = 0.
- Expected: Net sale = 100, Achievement = **100%**, Slab = **100–105%**,
  Rate = **Rs 41.06**, Incentive = 100 × 41.06 = **Rs 4,106.00**.

### T2. Working days — October 2026 (from spec)
- With today = 14 Oct 2026 and no holidays:
- Expected: "October: 31 days − 4 Sundays − 0 holidays = **27 working days**",
  Working days left (incl. today) = **16**.
- Expected: "Today: Wednesday, 14 October 2026".
- Time elapsed % = (27 − 16 + 1) / 27 = **44.4%**.

### T3. Return as negative quantity
- Add Sale: Combivair Forte, 10 packs. Add Return: Combivair Forte, 3 packs.
- Expected: Till date sale = 10, Till date return = 3, Net = **7**, Remaining = target − 7.

### T4. Slab edges
- Achievement exactly 86% → slab 86–89 (rate index 0). 89.9% → same slab. 90% → 90–99.
- 85.9% → "Below 86%", incentive Rs 0.

### T5. New month archive
- Start New Month (tap twice) → previous month appears in History with correct totals;
  sales log empty; till-date values 0; holidays cleared; products/targets/prices kept.

### T6. Offline indicator
- DevTools → Network → Offline, then add a sale.
- Expected: pill shows **"Offline: saved on this device"**; go back online → pill returns to **"Synced"**.

### T7. Sales OCR parsing (unit logic)
- Input line: `018777 *COMBIVAIR FORTE RO 491.30 85 0 662 0 0`
- Expected: today **85**, MTD **662**, return **0**.
- Input line: `035558 *IPRAVAIR S RESPULE 467.50 3 0 66 0 8`
- Expected: today **3**, MTD **66**, return **8**.
- A `Group Total` line must be ignored.

### T8. Target OCR parsing (unit logic)
- Input line: `COMBIVAIR FORTE 900 1,748` → target **1748**.
- Plain `KESTINE 500 800` (brand total) must be ignored.

### T9. Auth errors are visible
- Login with wrong password → red error box appears with the message.

### T10. No duplicate DOM IDs / no console errors
- Open DevTools console, use every tab → no red errors.

---

## What I verified myself (honest list)

- ✅ Extracted the inline `<script>` from `index.html` and ran `node --check` — **passed, no syntax errors**.
- ✅ Grepped for duplicate `id="..."` attributes — **none found**.
- ✅ Verified all 3 pinned CDN URLs return **HTTP 200**:
  - `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.44.4/dist/umd/supabase.min.js`
  - `https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js`
  - `https://cdn.jsdelivr.net/npm/tesseract.js@5.0.4/dist/tesseract.min.js`
- ✅ Formula spot-checks T1/T2 computed by hand against the spec — **match**.
- ✅ Generated real PNG icons (192 + 512) and confirmed they are valid PNGs.
- ✅ Verified the Netlify ZIP contains exactly the required files with correct relative paths (`unzip -l`).
- ✅ SQL reviewed for correctness (tables, RLS policies, manager insert).

## What I could NOT test (honest list)

- ❌ **Real Supabase project** — no credentials were available, so auth, RLS policies, password-reset email flow, and the manager `user_data` read were not tested end-to-end.
- ❌ **OCR accuracy on real/noisy photos** — `parseSalesOCR`/`parseTargetOCR` logic follows the spec examples, but Tesseract accuracy on blurry distributor screenshots was not tested.
- ❌ **Netlify deploy** — the drag-and-drop deploy was not performed.
- ❌ **PWA install on a real phone** — manifest/service worker installability and offline behavior on mobile were not tested on a device.
- ❌ **Cross-browser rendering** — only static checks; not tested in Safari/Chrome on actual phones.
