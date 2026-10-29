"use client";

import { useMathCalculator } from "@/hooks/math/useMathCalculator";
import { formatNumber } from "@/lib/calculators/math";
import { MainKeypad } from "@/components/calculators/math/MainKeypad";
import { ShareActions } from "@/components/ui/actions/ShareActions";
import { MdCalculate } from "react-icons/md";
import { CalcButton } from "@/components/ui/controls/CalcButton";

/**
 * Indikator memori yang muncul saat nilai memory bukan 0.
 * @param {Object} props
 * @param {number} props.memory - Nilai register memori saat ini
 */
function MemoryIndicator({ memory }) {
  if (memory === 0) return null;
  return (
    <span
      className="px-1.5 py-0.5 rounded bg-surface text-accent font-semibold text-xs"
      title={formatNumber(memory)}
    >
      M
    </span>
  );
}

/**
 * Panel tampilan kalkulator: ekspresi, hasil, dan terbilang.
 * @param {Object} props
 * @param {string} props.expression - Ekspresi matematika saat ini
 * @param {string} props.display - Nilai hasil yang ditampilkan
 * @param {string} props.terbilang - Representasi huruf dari hasil
 * @param {number} props.memory - Nilai memori saat ini
 */
function ResultDisplay({ expression, display, terbilang, memory }) {
  return (
    <div
      className="bg-surface rounded-xl p-4 flex flex-col justify-end min-h-[120px] transition-colors relative overflow-hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00685f 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      ></div>
      <div className="flex items-center justify-between w-full mb-1 text-text-muted">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <MemoryIndicator memory={memory} />
          <span className="text-text-muted">Ekspresi:</span>
        </div>
        <div
          className="text-xs text-text-muted tracking-tight text-right select-all font-mono"
          id="calc-expression"
        >
          {expression || "0"}
        </div>
      </div>
      <div className="flex items-baseline justify-end gap-2 overflow-x-auto select-all">
        <span
          className="font-mono font-bold text-accent tracking-tight tabular-nums"
          id="calc-display"
        >
          {display}
        </span>
      </div>
      {terbilang && (
        <p className="text-xs text-text-muted mt-2 italic" id="terbilang-text">
          {terbilang}
        </p>
      )}
    </div>
  );
}

/**
 * Bar register memori dengan tombol MC, MR, M+, M-, MS.
 * @param {Object} props
 * @param {number} props.memory - Nilai memori saat ini
 * @param {Function} props.onMemoryClick - Handler saat tombol memori diklik
 */
function MemoryBar({ memory, onMemoryClick }) {
  const buttons = [
    { key: "MC", label: "MC", title: "Memory Clear" },
    { key: "MR", label: "MR", title: "Memory Recall" },
    { key: "M+", label: "M+", title: "Memory Add" },
    { key: "M-", label: "M-", title: "Memory Subtract" },
    { key: "MS", label: "MS", title: "Memory Store" },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {buttons.map((btn) => (
        <CalcButton
          key={btn.key}
          variant="memory"
          className="py-1.5"
          onClick={() => onMemoryClick(btn.key)}
          title={btn.title}
          type="button"
        >
          {btn.label}
        </CalcButton>
      ))}
    </div>
  );
}

/**
 * Tape riwayat komputasi dengan daftar entri yang dapat dipilih.
 * @param {Object} props
 * @param {Array} props.history - Daftar entri riwayat
 * @param {Function} props.onSelectEntry - Handler saat entri dipilih
 * @param {Function} props.onClear - Handler saat riwayat dikosongkan
 */
function HistoryTape({ history, onSelectEntry, onClear }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text">Riwayat Komputasi</h3>
        <button
          className="text-xs text-text-muted hover:text-danger transition-colors"
          onClick={onClear}
          type="button"
        >
          Hapus Riwayat
        </button>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-4 text-center text-text-muted text-xs">
            Riwayat kosong
          </div>
        ) : (
          history.map((entry, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className="p-2.5 rounded-lg bg-canvas shadow-xs hover:bg-surface cursor-pointer transition-colors group flex items-center justify-between"
              onClick={() => onSelectEntry(entry)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectEntry(entry);
                }
              }}
            >
              <div className="min-w-0 pr-2">
                <div className="font-mono text-sm text-accent truncate">
                  {entry.expr}
                </div>
                <div className="text-xs text-text-muted">
                  {entry.time} • {entry.mode}
                </div>
              </div>
              <div className="font-mono text-sm font-bold text-accent whitespace-nowrap">
                = {entry.result}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Panel kanan yang berisi riwayat, share actions, dan info teknis.
 * @param {Object} props
 * @param {Array} props.history - Daftar entri riwayat komputasi
 * @param {Function} props.onHistorySelect - Handler saat riwayat dipilih
 * @param {Function} props.onClearHistory - Handler saat riwayat dikosongkan
 * @param {string} props.expression - Ekspresi saat ini
 * @param {string} props.display - Nilai tampilan saat ini
 */
function SignatureResultPanel({
  history,
  onHistorySelect,
  onClearHistory,
  expression,
  display,
}) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-20">
      {/* Signature Result Card */}
      <div className="bg-surface-teal rounded-xl p-6 shadow-sm flex flex-col">
        <HistoryTape
          history={history}
          onSelectEntry={onHistorySelect}
          onClear={onClearHistory}
        />
        {/* Copy & Share Actions */}
        <ShareActions
          text={`Hasil Kalkulator Matematika MyCalc\nEkspresi: ${expression}\nHasil: ${display}`}
          title="Hasil Kalkulator Matematika MyCalc"
        />
      </div>
      {/* Technical Info Callout */}
      <div className="flex items-start gap-4 rounded-[var(--radius-lg)] bg-canvas p-5 shadow-sm">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-surface-teal text-accent">
          <MdCalculate className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-medium text-text">
            Presisi Floating Point & Urutan Operasi (PEMDAS)
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            MyCalc memproses perhitungan berdasarkan urutan baku kurung,
            pangkat, kali-bagi, dan tambah-kurang. Hasil dibulatkan ke 15 digit
            signifikan sehingga bebas dari sisa pembulatan biner seperti 0,1 +
            0,2.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MathCalculator() {
  const {
    state,
    terbilang,
    handleDigit,
    handleOperator,
    handleAction,
    handleMemory,
    handleHistorySelect,
    handleClearHistory,
  } = useMathCalculator();

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      {/* LEFT COLUMN: Calculator Interface (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="bg-canvas rounded-xl shadow-sm p-5 md:p-6 flex flex-col gap-4">
          {/* Digital Display Panel */}
          <ResultDisplay
            expression={state.expression}
            display={state.display}
            terbilang={terbilang}
            memory={state.memory}
          />

          {/* Memory Registers Bar */}
          <MemoryBar memory={state.memory} onMemoryClick={handleMemory} />

          {/* Main Keypad */}
          <MainKeypad
            onDigitClick={handleDigit}
            onOperatorClick={handleOperator}
            onActionClick={handleAction}
            isNewInput={state.isNewInput}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Signature Result Panel & Tape History (5 cols) */}
      <SignatureResultPanel
        history={state.history}
        onHistorySelect={handleHistorySelect}
        onClearHistory={handleClearHistory}
        expression={state.expression}
        display={state.display}
      />
    </div>
  );
}
