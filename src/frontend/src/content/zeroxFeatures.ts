import {
  Activity,
  AppWindow,
  Camera,
  Code,
  Cpu,
  FolderSearch,
  Globe,
  Image,
  Keyboard,
  Layers,
  Lock,
  type LucideIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  Mic,
  Package,
  Puzzle,
  Search,
  Settings,
} from "lucide-react";

export interface ZeroxFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const zeroxFeatures: ZeroxFeature[] = [
  {
    title: "Voice-Controlled AI Interaction",
    description:
      "Control your computer naturally using voice commands with advanced speech recognition.",
    icon: Mic,
  },
  {
    title: "Natural AI Conversation Engine",
    description:
      "Engage in fluid, context-aware conversations with an intelligent AI assistant.",
    icon: MessageSquare,
  },
  {
    title: "Real-Time Speech-to-Text",
    description:
      "Convert spoken words to text instantly with high accuracy and low latency.",
    icon: Mic,
  },
  {
    title: "High-Quality Text-to-Speech",
    description:
      "Natural-sounding voice synthesis for AI responses and system feedback.",
    icon: MessageSquare,
  },
  {
    title: "Google LLM Support (Gemini)",
    description:
      "Powered by Google's advanced Gemini language model for intelligent responses.",
    icon: Globe,
  },
  {
    title: "Multi-Model AI Architecture",
    description:
      "Leverage multiple AI models for specialized tasks and enhanced capabilities.",
    icon: Layers,
  },
  {
    title: "Live Camera Feed Assistance",
    description:
      "Get real-time AI assistance using your computer's camera feed.",
    icon: Camera,
  },
  {
    title: "Computer Vision via OpenCV",
    description:
      "Advanced image processing and computer vision capabilities built-in.",
    icon: Camera,
  },
  {
    title: "Image Understanding & Analysis",
    description:
      "AI-powered image recognition, analysis, and description generation.",
    icon: Image,
  },
  {
    title: "AI-Powered Image Generation",
    description:
      "Create images from text descriptions using advanced AI models.",
    icon: Image,
  },
  {
    title: "Desktop Automation Engine",
    description:
      "Automate repetitive tasks and workflows on your desktop system.",
    icon: Cpu,
  },
  {
    title: "Full System Automation Control",
    description: "Complete control over system operations through AI commands.",
    icon: Settings,
  },
  {
    title: "Keyboard & Mouse Automation",
    description:
      "Programmatic control of keyboard and mouse for task automation.",
    icon: Keyboard,
  },
  {
    title: "Execute System-Level Commands",
    description:
      "Run system commands and scripts through voice or text instructions.",
    icon: Code,
  },
  {
    title: "Search Files via Voice Commands",
    description:
      "Find files on your computer using natural language voice search.",
    icon: FolderSearch,
  },
  {
    title: "Search Photos via Voice Commands",
    description: "Locate photos and images using voice-based content search.",
    icon: Search,
  },
  {
    title: "Open Applications on Command",
    description: "Launch any application instantly with simple voice commands.",
    icon: AppWindow,
  },
  {
    title: "Send WhatsApp Messages via AI",
    description: "Compose and send WhatsApp messages using voice instructions.",
    icon: MessageCircle,
  },
  {
    title: "Send Emails via Voice Instruction",
    description: "Draft and send emails hands-free with AI assistance.",
    icon: Mail,
  },
  {
    title: "Web Search Integration",
    description:
      "Perform web searches and get results without leaving your workflow.",
    icon: Globe,
  },
  {
    title: "Plugin-Based Expandable System",
    description: "Extend functionality with custom plugins and integrations.",
    icon: Puzzle,
  },
  {
    title: "Open-Source Customizable Core",
    description: "Modify and customize the core system to fit your needs.",
    icon: Code,
  },
  {
    title: "Modular Architecture",
    description: "Clean, modular design for easy maintenance and upgrades.",
    icon: Layers,
  },
  {
    title: "Background AI Processing",
    description:
      "AI runs efficiently in the background without interrupting your work.",
    icon: Activity,
  },
  {
    title: "Secure API Configuration",
    description:
      "Protected API key management and secure configuration storage.",
    icon: Lock,
  },
  {
    title: "First-Run Guided Setup",
    description: "Easy onboarding with step-by-step configuration wizard.",
    icon: Settings,
  },
  {
    title: "Installer-Based Deployment",
    description:
      "Simple installation process with automated setup and configuration.",
    icon: Package,
  },
];
