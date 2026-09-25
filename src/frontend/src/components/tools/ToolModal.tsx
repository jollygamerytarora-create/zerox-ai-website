import { useEffect } from "react";
import AsciiArt from "./dev/AsciiArt";
import Base64Tool from "./dev/Base64Tool";
import BinaryConverter from "./dev/BinaryConverter";
import QRCodeGenerator from "./dev/QRCodeGenerator";
import UUIDGenerator from "./dev/UUIDGenerator";
import CoinFlip from "./fun/CoinFlip";
import DiceRoller from "./fun/DiceRoller";
import ImageGenerator from "./fun/ImageGenerator";
import PasswordGenerator from "./fun/PasswordGenerator";
import PasswordStrengthChecker from "./fun/PasswordStrengthChecker";
import RandomNamePicker from "./fun/RandomNamePicker";
import VideoGenerator from "./fun/VideoGenerator";
import Worldle from "./fun/Worldle";
import MarginSafetyChecker from "./print/MarginSafetyChecker";
import PageSizeConverter from "./print/PageSizeConverter";
import PrintingCostCalculator from "./print/PrintingCostCalculator";
import EssayLengthChecker from "./study/EssayLengthChecker";
import ReadingTimeCalculator from "./study/ReadingTimeCalculator";
import TextCaseConverter from "./study/TextCaseConverter";
import WordCounter from "./study/WordCounter";
import type { ToolItem } from "./types";
import AccuracyTest from "./typing/AccuracyTest";
import CPMTest from "./typing/CPMTest";
import ClicksPerMinute from "./typing/ClicksPerMinute";
import MemoryTyping from "./typing/MemoryTyping";
import ReactionTime from "./typing/ReactionTime";
import WPMTest from "./typing/WPMTest";

interface ToolModalProps {
  tool: ToolItem | null;
  onClose: () => void;
}

function ToolContent({ toolId }: { toolId: string }) {
  switch (toolId) {
    case "word-counter":
      return <WordCounter />;
    case "text-case-converter":
      return <TextCaseConverter />;
    case "essay-length-checker":
      return <EssayLengthChecker />;
    case "reading-time-calculator":
      return <ReadingTimeCalculator />;
    case "printing-cost-calculator":
      return <PrintingCostCalculator />;
    case "page-size-converter":
      return <PageSizeConverter />;
    case "margin-safety-checker":
      return <MarginSafetyChecker />;
    case "password-generator":
      return <PasswordGenerator />;
    case "password-strength-checker":
      return <PasswordStrengthChecker />;
    case "random-name-picker":
      return <RandomNamePicker />;
    case "coin-flip":
      return <CoinFlip />;
    case "dice-roller":
      return <DiceRoller />;
    case "worldle":
      return <Worldle />;
    case "image-generator":
      return <ImageGenerator />;
    case "video-generator":
      return <VideoGenerator />;
    case "binary-converter":
      return <BinaryConverter />;
    case "qr-code-generator":
      return <QRCodeGenerator />;
    case "base64":
      return <Base64Tool />;
    case "uuid-generator":
      return <UUIDGenerator />;
    case "ascii-art":
      return <AsciiArt />;
    case "wpm-test":
      return <WPMTest />;
    case "cpm-test":
      return <CPMTest />;
    case "clicks-per-minute":
      return <ClicksPerMinute />;
    case "reaction-time":
      return <ReactionTime />;
    case "memory-typing":
      return <MemoryTyping />;
    case "accuracy-test":
      return <AccuracyTest />;
    default:
      return (
        <div className="text-center py-12 text-slate-400 font-mono">
          <p className="text-4xl mb-4">🔧</p>
          <p>Tool coming soon...</p>
        </div>
      );
  }
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  useEffect(() => {
    if (!tool) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [tool, onClose]);

  if (!tool) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.2s ease-out" }}
      data-ocid="tools.modal"
    >
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-violet-500/30 bg-slate-950/95 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.15)] overflow-hidden"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-violet-500/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <h2 className="text-lg font-bold font-mono text-slate-100">
                {tool.name}
              </h2>
              <p className="text-xs text-slate-400">{tool.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-fuchsia-300 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/30 transition-all font-mono"
            data-ocid="tools.modal.close_button"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <ToolContent toolId={tool.id} />
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(24px) scale(0.97); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
