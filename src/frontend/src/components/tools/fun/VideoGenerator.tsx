import { useCallback, useRef, useState } from "react";

type VideoModel = {
  id: string;
  pollinationsId: string;
  label: string;
  description: string;
  emoji: string;
};

const VIDEO_MODELS: VideoModel[] = [
  {
    id: "animatediff",
    pollinationsId: "animatediff",
    label: "AnimateDiff",
    description: "Smooth animated sequences from text",
    emoji: "🎬",
  },
  {
    id: "svd",
    pollinationsId: "stable-video",
    label: "Stable Video Diffusion",
    description: "High quality motion from prompts",
    emoji: "🎥",
  },
  {
    id: "modelscope",
    pollinationsId: "modelscope",
    label: "ModelScope Text-to-Video",
    description: "Realistic text-to-video generation",
    emoji: "🌊",
  },
  {
    id: "videocrafter",
    pollinationsId: "videocrafter",
    label: "VideoCrafter",
    description: "Creative, stylised video clips",
    emoji: "🎞️",
  },
];

const PROMPT_SUGGESTIONS = [
  "A sunset over the ocean with gentle waves",
  "A futuristic city with flying cars at night",
  "A campfire in a forest with sparkling embers",
  "Clouds drifting across a mountain peak",
  "A neon-lit street in the rain",
  "Northern lights dancing over a snowy landscape",
];

const TIMEOUT_MS = 90000;

export default function VideoGenerator() {
  const [model, setModel] = useState<string>("animatediff");
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedModel =
    VIDEO_MODELS.find((m) => m.id === model) ?? VIDEO_MODELS[0];

  const handleGenerate = useCallback(async () => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("Please enter a prompt to generate a video.");
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setVideoUrl(null);
    setProgress(0);

    // fake progress bar
    let p = 0;
    progressTimerRef.current = setInterval(() => {
      p = p < 80 ? p + (0.8 + Math.random() * 1.2) : p + 0.1;
      setProgress(Math.min(p, 90));
    }, 800);

    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const encoded = encodeURIComponent(trimmed);
      const seed = Math.floor(Math.random() * 999999);
      const url = `https://video.pollinations.ai/prompt/${encoded}?model=${selectedModel.pollinationsId}&seed=${seed}&nologo=true`;

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok)
        throw new Error(
          `API error ${res.status}. Try a different model or prompt.`,
        );

      const blob = await res.blob();
      if (
        !blob.type.startsWith("video/") &&
        !blob.type.includes("octet-stream")
      ) {
        throw new Error(
          "Unexpected response. The model may be temporarily unavailable — try again.",
        );
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      setProgress(100);
      const objectUrl = URL.createObjectURL(blob);
      setVideoUrl(objectUrl);
    } catch (e: unknown) {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      setProgress(0);
      if ((e as Error).name === "AbortError") {
        setError(
          "Generation timed out (90s). Try a simpler prompt or different model.",
        );
      } else {
        setError(
          e instanceof Error
            ? e.message
            : "Video generation failed. Try again or pick a different model.",
        );
      }
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }, [prompt, selectedModel]);

  const handleCancel = () => {
    abortRef.current?.abort();
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setProgress(0);
  };

  const handleDownload = useCallback(() => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `jollytech-video-${selectedModel.id}-${Date.now()}.mp4`;
    a.click();
  }, [videoUrl, selectedModel]);

  return (
    <div className="space-y-5 font-mono">
      <p className="text-slate-400 text-xs leading-relaxed">
        Generate AI videos free — powered by AnimateDiff, SVD & more via
        Pollinations.ai. Videos may take 30–90 seconds to generate.
      </p>

      {/* Model dropdown */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Video Model
        </p>
        <div className="relative">
          <button
            type="button"
            data-ocid="video_gen.model_select"
            onClick={() => setShowModelDropdown((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-purple-500/40 bg-slate-900/70 text-slate-200 text-sm hover:border-purple-400/60 transition-all focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <span className="text-base">{selectedModel.emoji}</span>
              <span className="font-bold text-purple-300">
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
              {VIDEO_MODELS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setModel(m.id);
                    setShowModelDropdown(false);
                    setVideoUrl(null);
                    setError(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all ${
                    model === m.id
                      ? "bg-purple-500/15 text-purple-300"
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
                    <span className="text-purple-400 text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prompt */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Prompt
        </p>
        <textarea
          data-ocid="video_gen.textarea"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setError(null);
          }}
          placeholder="Describe the video you want to generate..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-700/60 bg-slate-900/60 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 resize-none transition-all"
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

      {/* Error */}
      {error && (
        <div
          data-ocid="video_gen.error_state"
          className="px-4 py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs"
        >
          {error}
        </div>
      )}

      {/* Progress bar */}
      {loading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>
              Generating video{progress < 90 ? "..." : " — finalising..."}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 text-center">
            {selectedModel.label} · this can take up to 90 seconds
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          data-ocid="video_gen.primary_button"
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 py-3 rounded-xl border border-purple-500/50 bg-purple-500/10 text-purple-300 text-sm font-bold hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
              Generating...
            </span>
          ) : (
            `${selectedModel.emoji} Generate Video`
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
          data-ocid="video_gen.secondary_button"
          onClick={handleDownload}
          disabled={!videoUrl || loading}
          className="flex-1 py-3 rounded-xl border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⬇ Download
        </button>
      </div>

      {/* Video preview */}
      <div
        className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center"
        style={{ minHeight: 220 }}
      >
        {!loading && !videoUrl && (
          <div className="flex flex-col items-center justify-center text-slate-600 gap-2 py-10">
            <span className="text-5xl">{selectedModel.emoji}</span>
            <p className="text-xs">{selectedModel.label}</p>
            <p className="text-xs text-slate-700">
              Enter a prompt and hit Generate
            </p>
          </div>
        )}
        {loading && (
          <div
            data-ocid="video_gen.loading_state"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
          >
            <div className="relative">
              <div className="w-14 h-14 border-4 border-purple-400/20 border-t-purple-400 rounded-full animate-spin" />
              <div
                className="absolute inset-2 border-4 border-pink-400/20 border-b-pink-400 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "0.8s",
                }}
              />
            </div>
            <p className="text-xs text-purple-400 animate-pulse">
              AI is crafting your video...
            </p>
          </div>
        )}
        {videoUrl && !loading && (
          // biome-ignore lint/a11y/useMediaCaption: user-generated video
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            className="w-full"
            style={{ maxHeight: 420, display: "block" }}
          />
        )}
      </div>

      {videoUrl && !loading && (
        <p className="text-center text-xs text-slate-600">
          {selectedModel.label} · Generate again for a new variation
        </p>
      )}
    </div>
  );
}
