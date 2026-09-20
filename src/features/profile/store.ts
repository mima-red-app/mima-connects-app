import { create } from "zustand";
import type { ProfessionalUI } from "../professional/types";

// ─── Explore Slice ───
interface ExploreSlice {
  query: string;
  selectedCategory: string | null;
  aiMatches: ProfessionalUI[] | null;
  setQuery: (q: string) => void;
  setSelectedCategory: (c: string | null) => void;
  setAiMatches: (m: ProfessionalUI[] | null) => void;
  resetExplore: () => void;
}

// ─── UI Slice ───
interface UiSlice {
  isSignOutLoading: boolean;
  setSignOutLoading: (v: boolean) => void;
}

export type ProfileStore = ExploreSlice & UiSlice;

export const useProfileStore = create<ProfileStore>()((set) => ({
  query: "",
  selectedCategory: null,
  aiMatches: null,
  setQuery: (query) => set({ query }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setAiMatches: (aiMatches) => set({ aiMatches }),
  resetExplore: () =>
    set({ query: "", selectedCategory: null, aiMatches: null }),
  isSignOutLoading: false,
  setSignOutLoading: (v) => set({ isSignOutLoading: v }),
}));
