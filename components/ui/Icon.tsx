import {
  Activity, AppWindow, ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck,
  BarChart3, BrainCircuit, Boxes, Check, ChevronDown, Clock, Cloud, Code2,
  Database, Globe, Layers, Lock, Mail, Menu, MessageCircle, Minus, Phone,
  PhoneCall, PenTool, Plug, Plus, Rocket, Search, Server, ShieldCheck,
  ShoppingCart, Sparkles, TrendingUp, Users, Workflow, X, Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/types";

/**
 * Central icon registry. Content files reference icons by string name, so this
 * is the only place lucide-react is imported — the bundle ships exactly these.
 */
const registry: Record<string, LucideIcon> = {
  Activity, AppWindow, ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck,
  BarChart3, BrainCircuit, Boxes, Check, ChevronDown, Clock, Cloud, Code2,
  Database, Globe, Layers, Lock, Mail, Menu, MessageCircle, Minus, Phone,
  PhoneCall, PenTool, Plug, Plus, Rocket, Search, Server, ShieldCheck,
  ShoppingCart, Sparkles, TrendingUp, Users, Workflow, X, Zap,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
