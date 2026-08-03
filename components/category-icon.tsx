import {
  Clapperboard,
  MonitorPlay,
  Sparkles,
  Wrench,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  clapperboard: Clapperboard,
  "monitor-play": MonitorPlay,
  sparkles: Sparkles,
  wrench: Wrench,
  shield: Shield,
  smartphone: Smartphone,
};

export function getCategoryIcon(name: string): LucideIcon {
  return ICONS[name] ?? Clapperboard;
}
