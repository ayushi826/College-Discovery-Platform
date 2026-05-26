'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import {
  DEFAULT_FILTERS,
  CollegeFilters,
} from '@/types'

interface AppStore {
  filters: CollegeFilters

  comparisonIds: string[]

  savedCollegeIds: string[]

  setFilters: (
    filters: Partial<CollegeFilters>
  ) => void

  addToComparison: (id: string) => void

  removeFromComparison: (id: string) => void

  toggleSaveCollege: (id: string) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      filters: DEFAULT_FILTERS,

      comparisonIds: [],

      savedCollegeIds: [],

      setFilters: (filters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        })),

      addToComparison: (id) => {
        const current = get().comparisonIds

        if (
          current.includes(id) ||
          current.length >= 3
        )
          return

        set({
          comparisonIds: [...current, id],
        })
      },

      removeFromComparison: (id) =>
        set((state) => ({
          comparisonIds: state.comparisonIds.filter(
            (item) => item !== id
          ),
        })),

      toggleSaveCollege: (id) => {
        const saved = get().savedCollegeIds

        const exists = saved.includes(id)

        set({
          savedCollegeIds: exists
            ? saved.filter((item) => item !== id)
            : [...saved, id],
        })
      },
    }),

    {
      name: 'college-platform-store',
    }
  )
)