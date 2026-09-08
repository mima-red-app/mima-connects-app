import { useWindowDimensions } from "react-native";

const BASE_WIDTH = 390;
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.2;

export function useAppScale(): number {
  const { width } = useWindowDimensions();
  return Math.min(Math.max(width / BASE_WIDTH, MIN_SCALE), MAX_SCALE);
}

export function rs(base: number, scale: number): number {
  return Math.round(base * scale);
}

export interface TypeScale {
  sectionTitle: number;
  title: number;
  body: number;
  caption: number;
}

export function useTypeScale(): TypeScale {
  const s = useAppScale();
  return {
    sectionTitle: rs(18, s),
    title: rs(16, s),
    body: rs(14, s),
    caption: rs(12, s),
  };
}
