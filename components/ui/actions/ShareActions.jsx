"use client";

import { useState } from "react";
import { MdContentCopy, MdShare } from "react-icons/md";

export async function copyText(text) {
  if (!navigator.clipboard) return false;

  try {
    const permission = await navigator.permissions.query({
      name: "clipboard-write",
    });
    if (permission.state === "denied") return false;

    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function shareText({ title, text }) {
  if (navigator.share) {
    await navigator.share({ title, text, url: window.location.href });
    return true;
  }
  return copyText(text);
}

export function ShareActions({
  text,
  title,
  copyLabel = "Salin hasil",
  shareLabel = "Bagikan hasil",
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (await copyText(text)) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  }

  async function handleShare() {
    try {
      await shareText({ title, text });
    } catch {
      // A dismissed native share dialog is intentionally a no-op.
    }
  }

  return (
    <div className="mt-5 flex gap-2">
      <button
        className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-canvas px-3 text-xs font-medium text-text transition hover:bg-surface"
        onClick={handleCopy}
        type="button"
      >
        <MdContentCopy aria-hidden="true" />
        {copied ? "Tersalin" : copyLabel}
      </button>
      <button
        className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-canvas px-3 text-xs font-medium text-text transition hover:bg-surface"
        onClick={handleShare}
        type="button"
      >
        <MdShare aria-hidden="true" />
        {shareLabel}
      </button>
    </div>
  );
}
