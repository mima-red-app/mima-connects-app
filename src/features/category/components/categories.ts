import {
  AirVent,
  Car,
  Hammer,
  PaintRoller,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react-native";

export interface CategoryItem {
  title: string;
  icon: LucideIcon;
  query: string;
}

export const CATEGORIES: CategoryItem[] = [
  { title: "Electricidad", icon: Zap, query: "electricista" },
  { title: "Plomería", icon: Wrench, query: "plomera" },
  { title: "Aire", icon: AirVent, query: "aire" },
  { title: "Pintura", icon: PaintRoller, query: "pintor" },
  { title: "Carpintería", icon: Hammer, query: "carpintero" },
  { title: "Limpieza", icon: Sparkles, query: "limpieza" },
  { title: "Mecánica", icon: Car, query: "mecanico" },
  { title: "Celulares", icon: Smartphone, query: "celulares" },
];
