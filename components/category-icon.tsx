import {
  BookOpen,
  ShieldCheck,
  Bot,
  Film,
  Headphones,
  Gamepad2,
  Book,
  Download,
  Zap,
  GraduationCap,
  Smartphone,
  TabletSmartphone,
  Terminal,
  Laptop,
  Globe,
  Box,
  Clapperboard,
  MonitorPlay,
  Sparkles,
  Wrench,
  Shield,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  "shield-check": ShieldCheck,
  bot: Bot,
  film: Film,
  headphones: Headphones,
  "gamepad-2": Gamepad2,
  book: Book,
  download: Download,
  zap: Zap,
  "graduation-cap": GraduationCap,
  smartphone: Smartphone,
  "tablet-smartphone": TabletSmartphone,
  terminal: Terminal,
  laptop: Laptop,
  globe: Globe,
  box: Box,
  // Backwards-compatible aliases
  clapperboard: Clapperboard,
  "monitor-play": MonitorPlay,
  sparkles: Sparkles,
  wrench: Wrench,
  shield: Shield,
};

export function getCategoryIcon(name: string): LucideIcon {
  return ICONS[name] ?? Box;
}
