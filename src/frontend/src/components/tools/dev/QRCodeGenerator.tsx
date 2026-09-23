import { useState } from "react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generate = () => {
    if (!text.trim()) return;
    const encoded = encodeURIComponent(text.trim());
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`,
    );
  };

  return (
    <div className="space-y-5 font-mono">
      <p className="text-xs text-slate-400">
        Generate a QR code from any text or URL.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL..."
        rows={3}
        className="w-full bg-slate-900 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60 resize-none"
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={generate}
          className="px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all"
        >
          Generate QR
        </button>
        <button
          type="button"
          onClick={() => {
            setText("");
            setQrUrl("");
          }}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2"
        >
          Reset
        </button>
      </div>
      {qrUrl && (
        <div className="flex flex-col items-center gap-3 pt-2">
          <img
            src={qrUrl}
            alt="QR Code"
            className="w-48 h-48 rounded-xl border border-cyan-500/20"
          />
          <a
            href={qrUrl}
            download="qrcode.png"
            className="text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
