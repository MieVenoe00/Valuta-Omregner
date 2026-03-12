/* ─────────────────────────────────────────
   CozyFX — script.js
   Cozy Pixel Currency Converter PWA
   ───────────────────────────────────────── */

"use strict";

/* ════════════════════════════════════════
   CURRENCY DATABASE
   ════════════════════════════════════════ */
const CURRENCIES = [
	{ code: "USD", name: "US Dollar", flag: "🇺🇸" },
	{ code: "EUR", name: "Euro", flag: "🇪🇺" },
	{ code: "GBP", name: "British Pound", flag: "🇬🇧" },
	{ code: "DKK", name: "Danish Krone", flag: "🇩🇰" },
	{ code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
	{ code: "NOK", name: "Norwegian Krone", flag: "🇳🇴" },
	{ code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
	{ code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
	{ code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
	{ code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
	{ code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
	{ code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
	{ code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
	{ code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
	{ code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
	{ code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
	{ code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
	{ code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
	{ code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
	{ code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
	{ code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
	{ code: "PLN", name: "Polish Złoty", flag: "🇵🇱" },
	{ code: "THB", name: "Thai Baht", flag: "🇹🇭" },
	{ code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩" },
	{ code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
	{ code: "PHP", name: "Philippine Peso", flag: "🇵🇭" },
	{ code: "VND", name: "Vietnamese Dong", flag: "🇻🇳" },
	{ code: "EGP", name: "Egyptian Pound", flag: "🇪🇬" },
	{ code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
	{ code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
	{ code: "ILS", name: "Israeli Shekel", flag: "🇮🇱" },
	{ code: "CZK", name: "Czech Koruna", flag: "🇨🇿" },
	{ code: "HUF", name: "Hungarian Forint", flag: "🇭🇺" },
	{ code: "RON", name: "Romanian Leu", flag: "🇷🇴" },
	{ code: "HRK", name: "Croatian Kuna", flag: "🇭🇷" },
	{ code: "BGN", name: "Bulgarian Lev", flag: "🇧🇬" },
	{ code: "ISK", name: "Icelandic Króna", flag: "🇮🇸" },
	{ code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰" },
	{ code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩" },
	{ code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
	{ code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
	{ code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭" },
	{ code: "CLP", name: "Chilean Peso", flag: "🇨🇱" },
	{ code: "COP", name: "Colombian Peso", flag: "🇨🇴" },
	{ code: "PEN", name: "Peruvian Sol", flag: "🇵🇪" },
	{ code: "ARS", name: "Argentine Peso", flag: "🇦🇷" },
	{ code: "UAH", name: "Ukrainian Hryvnia", flag: "🇺🇦" },
	{ code: "TWD", name: "Taiwan Dollar", flag: "🇹🇼" },
	{ code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
	{ code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
];

/* Fallback rates relative to USD (approximate) */
const FALLBACK_RATES = {
	USD: 1,
	EUR: 0.92,
	GBP: 0.79,
	DKK: 6.88,
	SEK: 10.41,
	NOK: 10.55,
	JPY: 149.5,
	CNY: 7.24,
	CHF: 0.88,
	CAD: 1.36,
	AUD: 1.53,
	NZD: 1.63,
	HKD: 7.82,
	SGD: 1.34,
	KRW: 1325,
	INR: 83.1,
	MXN: 17.15,
	BRL: 4.97,
	ZAR: 18.7,
	RUB: 89.5,
	TRY: 30.5,
	PLN: 3.97,
	THB: 35.1,
	IDR: 15700,
	MYR: 4.72,
	PHP: 56.5,
	VND: 24500,
	EGP: 30.9,
	SAR: 3.75,
	AED: 3.67,
	ILS: 3.68,
	CZK: 22.4,
	HUF: 354,
	RON: 4.58,
	HRK: 6.92,
	BGN: 1.8,
	ISK: 137,
	PKR: 278,
	BDT: 110,
	NGN: 773,
	KES: 155,
	GHS: 12.1,
	CLP: 900,
	COP: 3950,
	PEN: 3.73,
	ARS: 357,
	UAH: 37.9,
	TWD: 31.5,
	QAR: 3.64,
	KWD: 0.308,
};

/* ════════════════════════════════════════
   STATE
   ════════════════════════════════════════ */
const state = {
	activeCurrencies: ["DKK", "USD", "EUR", "SEK"],
	favorites: ["USD", "EUR", "DKK", "SEK"],
	rates: { ...FALLBACK_RATES }, // rates keyed to USD
	ratesBase: "USD",
	baseCode: "DKK",
	baseAmount: 100,
	ratesTimestamp: null,
	ratesFetchedAt: null,
	modalTab: "all",
	searchQuery: "",
};

/* ════════════════════════════════════════
   STORAGE
   ════════════════════════════════════════ */
const STORE_KEY = "cozyfx_v2";

function loadState() {
	try {
		const saved = localStorage.getItem(STORE_KEY);
		if (!saved) return;
		const data = JSON.parse(saved);
		if (data.activeCurrencies?.length) state.activeCurrencies = data.activeCurrencies;
		if (data.favorites?.length) state.favorites = data.favorites;
		if (data.baseCode) state.baseCode = data.baseCode;
		if (typeof data.baseAmount === "number") state.baseAmount = data.baseAmount;
		if (data.rates) state.rates = { ...FALLBACK_RATES, ...data.rates };
		if (data.ratesTimestamp) state.ratesTimestamp = data.ratesTimestamp;
		if (data.ratesFetchedAt) state.ratesFetchedAt = data.ratesFetchedAt;
	} catch (e) {
		console.warn("CozyFX: failed to load state", e);
	}
}

function saveState() {
	try {
		localStorage.setItem(
			STORE_KEY,
			JSON.stringify({
				activeCurrencies: state.activeCurrencies,
				favorites: state.favorites,
				baseCode: state.baseCode,
				baseAmount: state.baseAmount,
				rates: state.rates,
				ratesTimestamp: state.ratesTimestamp,
				ratesFetchedAt: state.ratesFetchedAt,
			}),
		);
	} catch (e) {
		console.warn("CozyFX: failed to save state", e);
	}
}

/* ════════════════════════════════════════
   EXCHANGE RATE API
   ════════════════════════════════════════ */
const RATE_REFRESH_MS = 30 * 60 * 1000; // 30 minutes

async function fetchRates() {
	setRateStatus("loading", "fetching…");

	// Try multiple free endpoints
	const endpoints = ["https://open.er-api.com/v6/latest/USD", "https://api.frankfurter.app/latest?from=USD&amount=1"];

	for (const url of endpoints) {
		try {
			const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
			if (!res.ok) continue;
			const data = await res.json();

			// open.er-api format
			if (data.rates && data.base_code === "USD") {
				state.rates = { USD: 1, ...data.rates };
				state.ratesBase = "USD";
				state.ratesTimestamp = data.time_last_update_utc || new Date().toUTCString();
				state.ratesFetchedAt = Date.now();
				saveState();
				setRateStatus("ok", "live rates");
				updateLastUpdatedText();
				updateAllOutputs();
				return;
			}

			// frankfurter format
			if (data.rates && data.base === "USD") {
				state.rates = { USD: 1, ...data.rates };
				state.ratesBase = "USD";
				state.ratesTimestamp = data.date;
				state.ratesFetchedAt = Date.now();
				saveState();
				setRateStatus("ok", "live rates");
				updateLastUpdatedText();
				updateAllOutputs();
				return;
			}
		} catch (e) {
			console.warn("CozyFX: API failed:", url, e.message);
		}
	}

	// All failed — use cached / fallback
	setRateStatus("error", "offline mode");
	showToast("📡 Using cached rates — offline mode");
}

function maybeRefreshRates() {
	const age = Date.now() - (state.ratesFetchedAt || 0);
	if (age > RATE_REFRESH_MS) fetchRates();
	else {
		setRateStatus("ok", "cached rates");
		updateLastUpdatedText();
	}
}

function setRateStatus(type, label) {
	const el = document.getElementById("rate-status");
	if (!el) return;
	el.className = `rate-status ${type}`;
	el.querySelector(".status-label").textContent = label;
}

function updateLastUpdatedText() {
	const el = document.getElementById("last-updated");
	if (!el) return;
	if (!state.ratesFetchedAt) {
		el.textContent = "using fallback rates";
		return;
	}
	const mins = Math.floor((Date.now() - state.ratesFetchedAt) / 60000);
	if (mins < 1) el.textContent = "rates updated just now";
	else if (mins === 1) el.textContent = "rates updated 1 min ago";
	else if (mins < 60) el.textContent = `rates updated ${mins} mins ago`;
	else el.textContent = "rates may be outdated — refresh soon";
}

// Update the "last updated" text every minute
setInterval(updateLastUpdatedText, 60000);
// Periodic rate refresh
setInterval(() => {
	maybeRefreshRates();
}, RATE_REFRESH_MS);

/* ════════════════════════════════════════
   CONVERSION LOGIC
   ════════════════════════════════════════ */
function toUSD(amount, code) {
	const rate = state.rates[code];
	if (!rate) return 0;
	return amount / rate;
}

function fromUSD(usdAmount, code) {
	const rate = state.rates[code];
	if (!rate) return 0;
	return usdAmount * rate;
}

function convert(amount, from, to) {
	const usd = toUSD(amount, from);
	return fromUSD(usd, to);
}

function formatAmount(amount, code) {
	if (isNaN(amount) || amount === null) return "";
	const large = ["JPY", "KRW", "IDR", "VND", "CLP", "COP", "HUF", "PKR", "BDT", "NGN", "KES", "ISK", "ARS"];
	const decimals = large.includes(code) ? 0 : 2;
	return amount.toLocaleString("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals,
	});
}

function updateAllOutputs(sourceCode = null) {
	const amount = state.baseAmount;
	const base = state.baseCode;

	document.querySelectorAll(".currency-row").forEach((row) => {
		const code = row.dataset.code;
		if (code === (sourceCode || base)) return; // skip the source field

		const input = row.querySelector(".currency-amount");
		if (!input || document.activeElement === input) return;

		const converted = code === base ? amount : convert(amount, base, code);
		const formatted = amount === 0 || isNaN(amount) ? "" : formatAmount(converted, code);

		if (input.value !== formatted) {
			input.value = formatted;
			flashInput(input);
		}
	});
}

function flashInput(inputEl) {
	inputEl.classList.remove("updated");
	void inputEl.offsetWidth; // reflow
	inputEl.classList.add("updated");
	setTimeout(() => inputEl.classList.remove("updated"), 600);
}

/* ════════════════════════════════════════
   CURRENCY LIST UI
   ════════════════════════════════════════ */
function getCurrencyMeta(code) {
	return CURRENCIES.find((c) => c.code === code) || { code, name: code, flag: "💱" };
}

function renderCurrencyList() {
	const list = document.getElementById("currency-list");
	const empty = document.getElementById("empty-state");
	list.innerHTML = "";

	if (state.activeCurrencies.length === 0) {
		empty.classList.remove("hidden");
		return;
	}
	empty.classList.add("hidden");

	state.activeCurrencies.forEach((code, i) => {
		const row = buildCurrencyRow(code, i);
		list.appendChild(row);
	});

	// Set values
	syncAllInputValues();
}

function buildCurrencyRow(code, index) {
	const meta = getCurrencyMeta(code);
	const isBase = code === state.baseCode;

	const row = document.createElement("div");
	row.className = `currency-row${isBase ? " is-base" : ""}`;
	row.dataset.code = code;
	row.style.animationDelay = `${index * 0.04}s`;

	// Determine value
	const value = code === state.baseCode ? state.baseAmount : convert(state.baseAmount, state.baseCode, code);
	const displayVal = isNaN(value) || state.baseAmount === 0 ? "" : formatAmount(value, code);

	row.innerHTML = `
    <div class="drag-handle" aria-label="Drag to reorder" role="button" tabindex="-1">
      <span class="drag-dots"></span>
    </div>
    <div class="currency-info">
      <span class="currency-flag">${meta.flag}</span>
      <span class="currency-code">${code}</span>
      <span class="currency-name">${meta.name}</span>
    </div>
    <div class="currency-input-wrap">
      <input
        type="number"
        inputmode="decimal"
        class="currency-amount"
        value="${displayVal}"
        placeholder="0"
        aria-label="${meta.name} amount"
        autocomplete="off"
      />
    </div>
    <button class="remove-btn" aria-label="Remove ${code}" data-code="${code}">✕</button>
  `;

	// Input handler — live conversion
	const input = row.querySelector(".currency-amount");

	input.addEventListener("focus", () => {
		row.classList.add("is-base");
		// Remove is-base from others
		document.querySelectorAll(".currency-row").forEach((r) => {
			if (r !== row) r.classList.remove("is-base");
		});
	});

	input.addEventListener("input", () => {
		const rawVal = parseFloat(input.value);
		state.baseCode = code;
		state.baseAmount = isNaN(rawVal) ? 0 : rawVal;
		saveState();
		updateAllOutputs(code);
	});

	input.addEventListener("blur", () => {
		if (input.value === "" || input.value === "0") {
			state.baseAmount = 0;
		}
	});

	// Remove button
	const removeBtn = row.querySelector(".remove-btn");
	removeBtn.addEventListener("click", () => removeCurrency(code));

	// Drag handle
	const handle = row.querySelector(".drag-handle");
	initDragHandle(row, handle);

	return row;
}

function syncAllInputValues() {
	document.querySelectorAll(".currency-row").forEach((row) => {
		const code = row.dataset.code;
		const input = row.querySelector(".currency-amount");
		if (!input || document.activeElement === input) return;
		const val = code === state.baseCode ? state.baseAmount : convert(state.baseAmount, state.baseCode, code);
		input.value = isNaN(val) || state.baseAmount === 0 ? "" : formatAmount(val, code);
	});
}

/* ════════════════════════════════════════
   CURRENCY MANAGEMENT
   ════════════════════════════════════════ */
function addCurrency(code) {
	if (state.activeCurrencies.includes(code)) {
		showToast(`${code} is already added ✓`);
		return;
	}
	state.activeCurrencies.push(code);
	saveState();

	// Append single row with animation
	const list = document.getElementById("currency-list");
	const empty = document.getElementById("empty-state");
	empty.classList.add("hidden");
	const row = buildCurrencyRow(code, state.activeCurrencies.length - 1);
	list.appendChild(row);
	row.scrollIntoView({ behavior: "smooth", block: "nearest" });

	// Re-sync values
	syncAllInputValues();
	updateModalGrid();
	showToast(`${code} added ✨`);
}

function removeCurrency(code) {
	if (state.activeCurrencies.length <= 1) {
		showToast("Keep at least one currency 🌙");
		shakeRow(code);
		return;
	}

	state.activeCurrencies = state.activeCurrencies.filter((c) => c !== code);

	// If we removed the base, set new base to first remaining
	if (state.baseCode === code) {
		state.baseCode = state.activeCurrencies[0];
	}

	saveState();

	// Animate out the row
	const row = document.querySelector(`.currency-row[data-code="${code}"]`);
	if (row) {
		row.style.transition = "opacity 0.2s, transform 0.2s";
		row.style.opacity = "0";
		row.style.transform = "translateX(20px) scale(0.95)";
		setTimeout(() => {
			row.remove();
			const list = document.getElementById("currency-list");
			if (list.children.length === 0) {
				document.getElementById("empty-state").classList.remove("hidden");
			}
		}, 200);
	}

	updateModalGrid();
}

function shakeRow(code) {
	const row = document.querySelector(`.currency-row[data-code="${code}"]`);
	if (!row) return;
	row.style.animation = "shake 0.35s ease";
	row.addEventListener(
		"animationend",
		() => {
			row.style.animation = "";
		},
		{ once: true },
	);
}

/* ════════════════════════════════════════
   DRAG-AND-DROP REORDER
   Touch-friendly, mobile-first
   ════════════════════════════════════════ */
const drag = {
	active: false,
	el: null, // the actual DOM row being dragged
	ghost: null, // floating visual clone
	pointerOffsetY: 0, // finger Y offset within the row at drag start
	startIndex: 0, // original position in list
	currentIndex: 0, // current target position
	slots: [], // [{top, mid, height}] snapshotted at drag start
	rows: [], // live DOM rows snapshotted at drag start
	stepSize: 0, // row height + gap
};

const LONG_PRESS_MS = 400;

function initDragHandle(row, handle) {
	let pressTimer = null;
	let didLongPress = false;

	// Touch: long press anywhere on the row
	row.addEventListener(
		"touchstart",
		(e) => {
			if (e.target.closest("input, .remove-btn")) return;
			didLongPress = false;
			row.classList.add("long-press-active");
			pressTimer = setTimeout(() => {
				didLongPress = true;
				row.classList.remove("long-press-active");
				if (navigator.vibrate) navigator.vibrate(30);
				startDrag(e, row);
			}, LONG_PRESS_MS);
		},
		{ passive: true },
	);

	row.addEventListener("touchend", () => {
		clearTimeout(pressTimer);
		row.classList.remove("long-press-active");
	});

	row.addEventListener(
		"touchmove",
		() => {
			clearTimeout(pressTimer);
			row.classList.remove("long-press-active");
		},
		{ passive: true },
	);

	// Mouse: long press on the row (for desktop testing)
	row.addEventListener("mousedown", (e) => {
		if (e.target.closest("input, .remove-btn")) return;
		if (e.button !== 0) return;
		pressTimer = setTimeout(() => {
			startDrag(e, row);
		}, LONG_PRESS_MS);
	});

	row.addEventListener("mouseup", () => clearTimeout(pressTimer));
	row.addEventListener("mouseleave", () => clearTimeout(pressTimer));
}

function startDrag(e, row) {
	if (e.button !== undefined && e.button !== 0) return; // left button only
	e.preventDefault();

	const list = document.getElementById("currency-list");
	const rows = [...list.querySelectorAll(".currency-row")];
	const index = rows.indexOf(row);
	if (index === -1) return;

	const pointer = e.touches ? e.touches[0] : e;
	const rect = row.getBoundingClientRect();

	// Snapshot every row's geometry BEFORE we start moving anything
	const slots = rows.map((r) => {
		const br = r.getBoundingClientRect();
		return { top: br.top, mid: br.top + br.height / 2, height: br.height };
	});

	// Row height + gap between rows (used for shift amount)
	const gap = rows.length > 1 ? slots[1].top - slots[0].top - slots[0].height : 10;
	const stepSize = slots[index].height + gap;

	// How far down the finger is within the row (so ghost follows naturally)
	const pointerOffsetY = pointer.clientY - rect.top;

	// Create floating ghost clone
	const ghost = row.cloneNode(true);
	ghost.classList.add("drag-ghost");
	ghost.classList.remove("currency-row", "is-base", "is-dragging");
	ghost.style.left = rect.left + "px";
	ghost.style.width = rect.width + "px";
	ghost.style.height = rect.height + "px";
	ghost.style.top = rect.top + "px";
	ghost.style.transform = "scale(1.03) rotate(-0.5deg)";
	document.body.appendChild(ghost);

	// Dim the original slot
	row.classList.add("is-dragging");

	Object.assign(drag, {
		active: true,
		el: row,
		ghost,
		pointerOffsetY,
		startIndex: index,
		currentIndex: index,
		slots,
		rows,
		stepSize,
	});

	if (e.touches) {
		document.addEventListener("touchmove", onDragMove, { passive: false });
		document.addEventListener("touchend", onDragEnd, { passive: true });
		document.addEventListener("touchcancel", onDragEnd, { passive: true });
	} else {
		document.addEventListener("mousemove", onDragMove);
		document.addEventListener("mouseup", onDragEnd);
	}
}

function onDragMove(e) {
	if (!drag.active) return;
	e.preventDefault();

	const pointer = e.touches ? e.touches[0] : e;

	// Move ghost so the finger stays at the same relative position within it
	const newGhostTop = pointer.clientY - drag.pointerOffsetY;
	drag.ghost.style.top = newGhostTop + "px";

	// Ghost center in viewport coords
	const ghostCenter = newGhostTop + drag.slots[drag.startIndex].height / 2;

	// ── Find closest slot using midpoints ──────────────────────────────
	// The key: we compare ghostCenter against each row's ORIGINAL midpoint,
	// BUT adjusted for the virtual gap created by removing the dragged item.
	//
	// Imagine the dragged item is removed: rows above startIndex stay put,
	// rows below startIndex shift up by stepSize. We find which "virtual slot"
	// the ghost center is closest to.
	let newIndex = 0;
	let closestDist = Infinity;

	for (let i = 0; i < drag.rows.length; i++) {
		// Virtual midpoint: where row i's center would be if dragged item wasn't there
		let virtualMid = drag.slots[i].mid;
		if (i > drag.startIndex) virtualMid -= drag.stepSize;

		const dist = Math.abs(ghostCenter - virtualMid);
		if (dist < closestDist) {
			closestDist = dist;
			newIndex = i;
		}
	}

	if (newIndex !== drag.currentIndex) {
		drag.currentIndex = newIndex;
		applyShiftTransforms();
	}
}

function applyShiftTransforms() {
	const { rows, startIndex, currentIndex, stepSize } = drag;

	rows.forEach((row, i) => {
		if (row === drag.el) return; // dragged row stays invisible, ghost does the moving
		let shift = 0;
		if (startIndex < currentIndex) {
			// Dragging DOWN: rows between (startIndex+1 .. currentIndex) shift UP
			if (i > startIndex && i <= currentIndex) shift = -stepSize;
		} else if (startIndex > currentIndex) {
			// Dragging UP: rows between (currentIndex .. startIndex-1) shift DOWN
			if (i >= currentIndex && i < startIndex) shift = stepSize;
		}
		row.classList.add("drag-shift");
		row.style.transform = shift !== 0 ? `translateY(${shift}px)` : "";
	});
}

function onDragEnd() {
	if (!drag.active) return;
	drag.active = false;

	document.removeEventListener("touchmove", onDragMove);
	document.removeEventListener("touchend", onDragEnd);
	document.removeEventListener("touchcancel", onDragEnd);
	document.removeEventListener("mousemove", onDragMove);
	document.removeEventListener("mouseup", onDragEnd);

	// Snap ghost into the final target slot position, then fade it out
	const targetSlot = drag.slots[drag.currentIndex];
	const shiftAtTarget = drag.startIndex < drag.currentIndex ? -drag.stepSize : drag.startIndex > drag.currentIndex ? drag.stepSize : 0;
	const targetTop = targetSlot.top + shiftAtTarget;

	drag.ghost.style.transition = "top 0.15s cubic-bezier(0.4,0,0.2,1), transform 0.15s ease, opacity 0.15s ease";
	drag.ghost.style.top = targetTop + "px";
	drag.ghost.style.transform = "scale(1) rotate(0deg)";
	drag.ghost.style.opacity = "0";

	setTimeout(() => {
		// Remove ghost and clean up all row transforms
		drag.ghost.remove();
		drag.rows.forEach((r) => {
			r.classList.remove("is-dragging", "drag-shift");
			r.style.transform = "";
			r.style.transition = "";
		});

		// Commit the new order if it changed
		if (drag.startIndex !== drag.currentIndex) {
			const arr = [...state.activeCurrencies];
			const [moved] = arr.splice(drag.startIndex, 1);
			arr.splice(drag.currentIndex, 0, moved);
			state.activeCurrencies = arr;
			saveState();
			renderCurrencyList();
		}

		drag.el = null;
		drag.ghost = null;
		drag.rows = [];
		drag.slots = [];
	}, 160);
}

/* ════════════════════════════════════════
   MODAL
   ════════════════════════════════════════ */
function openModal() {
	state.searchQuery = "";
	const overlay = document.getElementById("modal-overlay");
	const search = document.getElementById("currency-search");
	overlay.classList.remove("hidden");
	document.body.style.overflow = "hidden";
	search.value = "";
	updateModalGrid();
	setTimeout(() => search.focus(), 100);
}

function closeModal() {
	const overlay = document.getElementById("modal-overlay");
	overlay.classList.add("hidden");
	document.body.style.overflow = "";
}

function getFilteredCurrencies() {
	let list = CURRENCIES;
	if (state.modalTab === "favorites") {
		list = list.filter((c) => state.favorites.includes(c.code));
	}
	const q = state.searchQuery.trim().toLowerCase();
	if (q) {
		list = list.filter((c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
	}
	return list;
}

function updateModalGrid() {
	const grid = document.getElementById("currency-grid");
	const filtered = getFilteredCurrencies();
	grid.innerHTML = "";

	if (filtered.length === 0) {
		grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔭</div>
        <p>No currencies found</p>
      </div>`;
		return;
	}

	filtered.forEach((cur, i) => {
		const item = document.createElement("div");
		const isAdded = state.activeCurrencies.includes(cur.code);
		const isStarred = state.favorites.includes(cur.code);

		item.className = `currency-item${isAdded ? " already-added" : ""}`;
		item.style.animationDelay = `${Math.min(i * 0.025, 0.3)}s`;
		item.dataset.code = cur.code;

		item.innerHTML = `
      <div class="item-top">
        <span class="item-flag">${cur.flag}</span>
        <button class="item-star ${isStarred ? "starred" : ""}" data-code="${cur.code}" aria-label="Favorite ${cur.code}">
          ${isStarred ? "★" : "☆"}
        </button>
      </div>
      <span class="item-code">${cur.code}</span>
      <span class="item-name">${cur.name}</span>
    `;

		// Click to add
		item.addEventListener("click", (e) => {
			if (e.target.classList.contains("item-star")) return;
			addCurrency(cur.code);
			closeModal();
		});

		// Star / favorite
		item.querySelector(".item-star").addEventListener("click", (e) => {
			e.stopPropagation();
			toggleFavorite(cur.code);
		});

		grid.appendChild(item);
	});
}

function toggleFavorite(code) {
	if (state.favorites.includes(code)) {
		state.favorites = state.favorites.filter((c) => c !== code);
		showToast(`${code} removed from favorites`);
	} else {
		state.favorites.push(code);
		showToast(`${code} ★ added to favorites!`);
	}
	saveState();
	updateModalGrid();
}

/* ════════════════════════════════════════
   TOAST
   ════════════════════════════════════════ */
let toastTimer = null;
function showToast(msg) {
	const toast = document.getElementById("toast");
	toast.textContent = msg;
	toast.classList.remove("hidden", "toast-out");
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => {
		toast.classList.add("toast-out");
		setTimeout(() => toast.classList.add("hidden"), 300);
	}, 2000);
}

/* ════════════════════════════════════════
   P5.JS BACKGROUND — COZY STAR FIELD
   ════════════════════════════════════════ */
function initBackground() {
	const bgEl = document.getElementById("bg-canvas");

	new p5((p) => {
		const STAR_COUNT = 55;
		const PIXEL_COUNT = 12;
		let stars = [];
		let pixels = [];

		p.setup = function () {
			const cnv = p.createCanvas(window.innerWidth, window.innerHeight);
			cnv.parent("bg-canvas");
			cnv.style("position", "fixed");
			cnv.style("top", "0");
			cnv.style("left", "0");
			cnv.style("pointer-events", "none");
			p.noStroke();

			// Init stars
			for (let i = 0; i < STAR_COUNT; i++) {
				stars.push({
					x: p.random(p.width),
					y: p.random(p.height),
					size: p.random(1, 2.5),
					alpha: p.random(40, 180),
					speed: p.random(0.3, 1.2),
					phase: p.random(p.TWO_PI),
				});
			}

			// Init floating pixel accents
			for (let i = 0; i < PIXEL_COUNT; i++) {
				pixels.push({
					x: p.random(p.width),
					y: p.random(p.height),
					size: p.random(2, 5),
					col: p.random() > 0.5 ? [123, 123, 255] : [196, 181, 253],
					alpha: p.random(15, 50),
					vy: p.random(-0.15, -0.4),
					vx: p.random(-0.1, 0.1),
					phase: p.random(p.TWO_PI),
				});
			}
		};

		p.draw = function () {
			p.clear();
			const t = p.frameCount * 0.01;

			// Stars
			stars.forEach((s) => {
				const a = s.alpha + p.sin(t * s.speed + s.phase) * 40;
				p.fill(200, 200, 255, p.max(0, a));
				// Pixel-style: draw as a 2x2 square for the bigger ones
				if (s.size > 1.8) {
					p.rect(p.floor(s.x), p.floor(s.y), 2, 2);
				} else {
					p.ellipse(s.x, s.y, s.size, s.size);
				}
			});

			// Floating pixels
			pixels.forEach((px) => {
				const a = px.alpha + p.sin(t * 1.5 + px.phase) * 10;
				p.fill(px.col[0], px.col[1], px.col[2], p.max(0, a));
				p.rect(p.floor(px.x), p.floor(px.y), px.size, px.size);

				px.x += px.vx;
				px.y += px.vy;

				if (px.y < -10) {
					px.y = p.height + 10;
					px.x = p.random(p.width);
				}
				if (px.x < -10) {
					px.x = p.width + 10;
				}
				if (px.x > p.width + 10) {
					px.x = -10;
				}
			});
		};

		p.windowResized = function () {
			p.resizeCanvas(window.innerWidth, window.innerHeight);
		};
	});
}

/* ════════════════════════════════════════
   EVENT LISTENERS
   ════════════════════════════════════════ */
function bindEvents() {
	// Add currency button
	document.getElementById("add-currency-btn").addEventListener("click", openModal);

	// Modal close
	document.getElementById("modal-close").addEventListener("click", closeModal);

	// Close on overlay click
	document.getElementById("modal-overlay").addEventListener("click", (e) => {
		if (e.target.id === "modal-overlay") closeModal();
	});

	// Search input
	document.getElementById("currency-search").addEventListener("input", (e) => {
		state.searchQuery = e.target.value;
		updateModalGrid();
	});

	// Modal tabs
	document.querySelectorAll(".tab-btn").forEach((btn) => {
		btn.addEventListener("click", () => {
			document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			state.modalTab = btn.dataset.tab;
			updateModalGrid();
		});
	});

	// Swipe down to close modal
	let touchStartY = 0;
	const modal = document.querySelector(".modal");
	modal.addEventListener(
		"touchstart",
		(e) => {
			touchStartY = e.touches[0].clientY;
		},
		{ passive: true },
	);
	modal.addEventListener(
		"touchmove",
		(e) => {
			const dy = e.touches[0].clientY - touchStartY;
			if (dy > 60) closeModal();
		},
		{ passive: true },
	);

	// Keyboard: Escape closes modal
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeModal();
	});
}

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
function init() {
	loadState();
	renderCurrencyList();
	bindEvents();
	maybeRefreshRates();

	// Start p5 background
	if (typeof p5 !== "undefined") {
		initBackground();
	}

	// Ensure base row is highlighted correctly
	const baseRow = document.querySelector(`.currency-row[data-code="${state.baseCode}"]`);
	if (baseRow) baseRow.classList.add("is-base");
}

// Run when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
