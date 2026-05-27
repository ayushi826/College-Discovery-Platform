import { create } from "zustand";

interface AppState {
  comparisonIds: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  comparisonIds: [],

  addToComparison: (id) =>
    set((state) => ({
      comparisonIds: [...state.comparisonIds, id],
    })),

  removeFromComparison: (id) =>
    set((state) => ({
      comparisonIds: state.comparisonIds.filter(
        (item) => item !== id
      ),
    })),
}));