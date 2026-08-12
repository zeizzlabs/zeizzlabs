import {
  Activity,
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  Check,
  Code2,
  Database,
  Layers,
  Menu,
  Package,
  PenTool,
  Plug,
  Rocket,
  Server,
  Sparkles,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/types";

/**
 * Central icon registry. Content files reference icons by string name; this map
 * is the single place lucide-react is imported, so the bundle only ships the
 * icons actually used. Add a new icon here to make it available to content.
 */
const registry: Record<string, LucideIcon> = {
  Activity,
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  Check,
  Code2,
  Database,
  Layers,
  Menu,
  Package,
  PenTool,
  Plug,
  Rocket,
  Server,
  Sparkles,
  Users,
  Workflow,
  X,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
