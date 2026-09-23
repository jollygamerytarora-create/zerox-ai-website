import { useState } from "react";
import type { ToolItem } from "./types";

interface CategoryCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  tools: ToolItem[];
  comingSoon?: boolean;
  searchQuery: string;
  onToolClick: (tool: ToolItem) => void;
}

export default function CategoryCard({
  icon,
  name,
  description,
  tools,
  comingSoon,
  searchQuery,
  onToolClick,
}: CategoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const filteredTools = searchQuery
    ? tools.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tools;

  const shouldExpand =
    expanded || (searchQuery !== "" && filteredTools.length > 0);

  if (searchQuery !== "" && filteredTools.length === 0 && !comingSoon)
    return null;

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        comingSoon
          ? "border-slate-700/40 bg-slate-900/30 opacity-60"
          : "border-cyan-500/20 bg-slate-900/50 backdrop-blur-md hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
      }`}
    >
      {/* Subtle scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,217,255,0.03) 2px, rgba(0,217,255,0.03) 4px)",
        }}
      />

      {/* Card Header — clickable button */}
      <button
        type="button"
        disabled={comingSoon}
        onClick={() => setExpanded(!expanded)}
        className="relative w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        data-ocid={`tools.${name.toLowerCase().replace(/\s+/g, "_")}.button`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                comingSoon
                  ? "bg-slate-800/60"
                  : "bg-cyan-500/10 border border-cyan-500/30"
              }`}
            >
              {icon}
            </div>
            <div>
              <h3
                className={`text-lg font-bold font-mono tracking-wide ${
                  comingSoon ? "text-slate-500" : "text-slate-100"
                }`}
              >
                {name}
              </h3>
              <p
                className={`text-sm mt-1 ${
                  comingSoon ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {comingSoon ? (
              <span className="text-xs font-mono px-2 py-1 rounded-full bg-slate-800 text-slate-500 border border-slate-700">
                SOON
              </span>
            ) : (
              <>
                <span className="text-xs font-mono text-cyan-500/70">
                  {tools.length} tools
                </span>
                <span
                  className={`text-cyan-400 transition-transform duration-300 ${
                    shouldExpand ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </>
            )}
          </div>
        </div>
      </button>

      {/* Expandable Tool List */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          shouldExpand ? "max-h-[400px]" : "max-h-0"
        } overflow-hidden`}
      >
        <div className="px-6 pb-6 border-t border-cyan-500/10">
          {/* Scrollable inner container */}
          <div
            className="pt-4 grid gap-2 max-h-[320px] overflow-y-auto pr-1
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-slate-800/40
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-cyan-500/40
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb:hover]:bg-cyan-400/70"
          >
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => onToolClick(tool)}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/15 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all duration-200 group"
                data-ocid={`tools.${tool.id}.button`}
              >
                <span className="text-lg">{tool.icon}</span>
                <div>
                  <p className="text-sm font-mono font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                    {tool.description}
                  </p>
                </div>
                <span className="ml-auto text-cyan-500/50 group-hover:text-cyan-400 text-xs font-mono transition-colors">
                  OPEN →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
