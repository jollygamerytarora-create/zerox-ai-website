import { useCallback, useRef, useState } from "react";

type AIModel = {
  id: string;
  pollinationsId: string;
  label: string;
  description: string;
  emoji: string;
};

const AI_MODELS: AIModel[] = [
  {
    id: "flux1",
    pollinationsId: "flux",
    label: "FLUX.1 Standard",
    description: "Fast, sharp, photorealistic quality",
    emoji: "⚡",
  },
  {
    id: "flux1-realism",
    pollinationsId: "flux-realism",
    label: "FLUX.1 Realism",
    description: "Photorealistic scenes & portraits",
    emoji: "📸",
  },
  {
    id: "sdxl",
    pollinationsId: "turbo",
    label: "Stable Diffusion XL",
    description: "High-res detail, SDXL style",
    emoji: "🖼️",
  },
  {
    id: "openjourney",
    pollinationsId: "flux-anime",
    label: "OpenJourney",
    description: "Midjourney-inspired artistic style",
    emoji: "🎨",
  },
  {
    id: "kandinsky",
    pollinationsId: "flux-3d",
    label: "Kandinsky",
    description: "Vivid, surreal artistic generation",
    emoji: "🌀",
  },
  {
    id: "deepfloyd",
    pollinationsId: "flux-cablyai",
    label: "DeepFloyd IF",
    description: "Deep photorealism & text clarity",
    emoji: "🔮",
  },
  {
    id: "sd15",
    pollinationsId: "gptimage",
    label: "Stable Diffusion 1.5",
    description: "Classic SD, versatile & creative",
    emoji: "🎭",
  },
  {
    id: "kontext",
    pollinationsId: "kontext",
    label: "FLUX Kontext",
    description: "Context-aware intelligent generation",
    emoji: "🧠",
  },
];

const SIZE_OPTIONS = [
  { label: "512 × 512", w: 512, h: 512 },
  { label: "768 × 512 (wide)", w: 768, h: 512 },
  { label: "512 × 768 (tall)", w: 512, h: 768 },
  { label: "1024 × 1024 (HD)", w: 1024, h: 1024 },
  { label: "1200 × 630 (social)", w: 1200, h: 630 },
];

const PROMPT_SUGGESTIONS = [
  "A futuristic city skyline at night with neon lights",
  "A mystical forest with glowing mushrooms and fireflies",
  "An astronaut floating in a colorful nebula",
  "A cyberpunk street market in the rain",
  "A serene Japanese garden with cherry blossoms",
  "A dragon soaring over snow-capped mountains",
  "Abstract art with swirling galaxies and planets",
  "A cozy coffee shop interior with warm lighting",
];

const TIMEOUT_MS = 45000;

export default function ImageGenerator() {
  const [model, setModel] = useState<string>("flux1");
  const [prompt, setPrompt] = useState("");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const dotsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedModel = AI_MODELS.find((m) => m.id === model) ?? AI_MODELS[0];
  const selectedSize = SIZE_OPTIONS[sizeIdx];

  const handleGenerate = useCallback(async () => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("Please enter a prompt to generate an image.");
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    // start animated dots
    let dotCount = 0;
    dotsTimerRef.current = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setLoadingDots(".".repeat(dotCount));
    }, 500);

    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const encoded = encodeURIComponent(trimmed);
      const seed = Math.floor(Math.random() * 999999);
      const url = `https://image.pollinations.ai/prompt/${encoded}?model=${selectedModel.pollinationsId}&width=${selectedSize.w}&height=${selectedSize.h}&seed=${seed}&nologo=true&enhance=true`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);
    } catch (e: unknown) {
      if ((e as Error).name === "AbortError") {
        setError("Generation timed out. Try a shorter prompt or smaller size.");
      } else {
        setError(
          e instanceof Error
            ? e.message
            : "Generation failed. Try again or pick a different model.",
        );
      }
    } finally {
      clearTimeout(timer);
      if (dotsTimerRef.current) {
        clearInterval(dotsTimerRef.current);
        dotsTimerRef.current = null;
      }
      setLoadingDots("");
      setLoading(false);
    }
  }, [prompt, selectedModel, selectedSize]);

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `jollytech-${selectedModel.id}-${Date.now()}.png`;
    a.click();
  }, [imageUrl, selectedModel]);

  return (
    <div className="space-y-5 font-mono">
      <p className="text-slate-400 text-xs leading-relaxed">
        Generate AI images free — powered by FLUX.1 & Stable Diffusion models
        via Pollinations.ai. No API key needed.
      </p>

      {/* Model dropdown */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          AI Model
        </p>
        <div className="relative">
          <button
            type="button"
            data-ocid="image_gen.model_select"
            onClick={() => setShowModelDropdown((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-violet-500/40 bg-slate-900/70 text-slate-200 text-sm hover:border-fuchsia-400/60 transition-all focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <span className="text-base">{selectedModel.emoji}</span>
              <span className="font-bold text-fuchsia-300">
                {selectedModel.label}
              </span>
              <span className="text-slate-500 text-xs hidden sm:inline">
                — {selectedModel.description}
              </span>
            </span>
            <span
              className={`text-slate-400 transition-transform duration-200 ${
                showModelDropdown ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {showModelDropdown && (
            <div className="absolute z-50 w-full mt-1 rounded-xl border border-slate-700/80 bg-slate-950/95 backdrop-blur-md shadow-2xl overflow-hidden">
              {AI_MODELS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setModel(m.id);
                    setShowModelDropdown(false);
                    setImageUrl(null);
                    setError(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all ${
                    model === m.id
                      ? "bg-violet-500/15 text-fuchsia-300"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  <span className="text-base w-6 text-center">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs">{m.label}</div>
                    <div className="text-slate-500 text-xs truncate">
                      {m.description}
                    </div>
                  </div>
                  {model === m.id && (
                    <span className="text-fuchsia-400 text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prompt input */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Prompt
        </p>
        <textarea
          data-ocid="image_gen.textarea"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setError(null);
          }}
          placeholder="Describe the image you want to generate..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-700/60 bg-slate-900/60 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/50 resize-none transition-all"
        />
        <div className="flex flex-wrap gap-1.5">
          {PROMPT_SUGGESTIONS.slice(0, 4).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setPrompt(s);
                setError(null);
              }}
              className="text-xs px-2.5 py-1 rounded-full border border-slate-700/50 bg-slate-900/40 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-all truncate max-w-[180px]"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Output Size
        </p>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((sz, i) => (
            <button
              key={sz.label}
              type="button"
              data-ocid="image_gen.size_select"
              onClick={() => setSizeIdx(i)}
              className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                sizeIdx === i
                  ? "border-purple-400/60 bg-purple-500/15 text-purple-300"
                  : "border-slate-700/60 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {sz.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          data-ocid="image_gen.error_state"
          className="px-4 py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs"
        >
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          data-ocid="image_gen.primary_button"
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 py-3 rounded-xl border border-violet-500/50 bg-violet-500/10 text-fuchsia-300 text-sm font-bold hover:bg-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-fuchsia-400/30 border-t-fuchsia-400 rounded-full animate-spin" />
              Generating{loadingDots}
            </span>
          ) : (
            `${selectedModel.emoji} Generate`
          )}
        </button>
        {loading && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          data-ocid="image_gen.secondary_button"
          onClick={handleDownload}
          disabled={!imageUrl || loading}
          className="flex-1 py-3 rounded-xl border border-purple-500/50 bg-purple-500/10 text-purple-300 text-sm font-bold hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⬇ Download
        </button>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center"
        style={{ minHeight: 220 }}
      >
        {loading && (
          <div
            data-ocid="image_gen.loading_state"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
          >
            <div className="w-10 h-10 border-4 border-fuchsia-400/20 border-t-fuchsia-400 rounded-full animate-spin" />
            <p className="text-xs text-fuchsia-400 animate-pulse">
              {selectedModel.label} is generating{loadingDots}
            </p>
            <p className="text-xs text-slate-600">
              {selectedSize.w}×{selectedSize.h}px · may take up to 30s
            </p>
          </div>
        )}
        {!loading && !imageUrl && (
          <div className="flex flex-col items-center justify-center text-slate-600 gap-2 py-10">
            <span className="text-5xl">{selectedModel.emoji}</span>
            <p className="text-xs">{selectedModel.label}</p>
            <p className="text-xs text-slate-700">
              {selectedSize.w} × {selectedSize.h}px
            </p>
          </div>
        )}
        {imageUrl && !loading && (
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full object-contain"
            style={{ maxHeight: 420, display: "block" }}
          />
        )}
      </div>

      {imageUrl && !loading && (
        <p className="text-center text-xs text-slate-600">
          {selectedSize.w}×{selectedSize.h}px · {selectedModel.label} · Generate
          again for a new variation
        </p>
      )}
    </div>
  );
}
