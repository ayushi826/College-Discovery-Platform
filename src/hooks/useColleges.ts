import { useState, useEffect, useCallback } from "react";
import { College, DEFAULT_FILTERS } from "@/types";

import {
  getColleges,
  getCollegeById,
  getCollegesByIds,
  getSavedColleges,
  loginUser,
  signupUser,
} from "@/services/college.service";

import { useAppStore } from "@/store/useAppStore";

// ── useColleges ────────────────────────────────────────────
export function useColleges() {

  const filters = DEFAULT_FILTERS;
  const page = 1;
  const limit = 10;

  const [colleges, setColleges] =
    useState<College[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchColleges = useCallback(
    async () => {

      setIsLoading(true);
      setError(null);

      try {

        const res =
          await getColleges(
            filters,
            page,
            limit
          );

        setColleges(res.data);

      } catch (e) {

        setError(
          "Failed to load colleges."
        );

        console.error(e);

      } finally {

        setIsLoading(false);

      }
    },

    []
  );

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  return {
    colleges,
    isLoading,
    error,
    refetch: fetchColleges,
  };
}

// ── useCollege ────────────────────────────────────────────
export function useCollege(id: string) {

  const [college, setCollege] =
    useState<College | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    if (!id) return;

    let cancelled = false;

    (async () => {

      setIsLoading(true);

      try {

        const res =
          await getCollegeById(id);

        if (!cancelled) {

          setCollege(res.data);

          if (!res.success) {
            setError(
              "College not found."
            );
          }
        }

      } catch {

        if (!cancelled) {

          setError(
            "Failed to load college details."
          );
        }

      } finally {

        if (!cancelled) {
          setIsLoading(false);
        }
      }

    })();

    return () => {
      cancelled = true;
    };

  }, [id]);

  return {
    college,
    isLoading,
    error,
  };
}

// ── useComparison ─────────────────────────────────────────
export function useComparison() {

  const comparisonIds =
    useAppStore().comparisonIds;

  const [colleges, setColleges] =
    useState<College[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {

    if (comparisonIds.length === 0) {

      setColleges([]);
      return;
    }

    setIsLoading(true);

    getCollegesByIds(
      comparisonIds
    ).then((res) => {

      setColleges(res.data);

      setIsLoading(false);

    });

  }, [comparisonIds]);

  return {
    colleges,
    isLoading,
    count: comparisonIds.length,
  };
}

// ── useSavedColleges ──────────────────────────────────────
export function useSavedColleges() {

  const [colleges, setColleges] =
    useState<College[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {

    setIsLoading(true);

    getSavedColleges([]).then(
      (res) => {

        setColleges(res.data);

        setIsLoading(false);

      }
    );

  }, []);

  return {
    colleges,
    isLoading,
  };
}

// ── useCollegeSave ────────────────────────────────────────
export function useCollegeSave(
  collegeId: string
) {

  const isSaved = false;

  const toggleSave = () => {
    console.log(
      "Save toggled:",
      collegeId
    );
  };

  return {
    isSaved,
    toggleSave,
  };
}

// ── useAuth ───────────────────────────────────────────────
export function useAuth() {

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleLogin = async (
    email: string,
    password: string
  ) => {

    setIsLoading(true);
    setError(null);

    try {

      const res =
        await loginUser(
          email,
          password
        );

      if (res.success) {
        return true;
      }

    } catch {

      setError(
        "Login failed."
      );

    } finally {

      setIsLoading(false);

    }

    return false;
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ) => {

    setIsLoading(true);
    setError(null);

    try {

      const res =
        await signupUser(
          name,
          email,
          password
        );

      if (res.success) {
        return true;
      }

    } catch {

      setError(
        "Signup failed."
      );

    } finally {

      setIsLoading(false);

    }

    return false;
  };

  return {
    handleLogin,
    handleSignup,
    isLoading,
    error,

    clearError: () =>
      setError(null),
  };
}

// ── useDebounce ───────────────────────────────────────────
export function useDebounce<T>(
  value: T,
  delay: number = 350
): T {

  const [debouncedValue,
    setDebouncedValue] =
      useState<T>(value);

  useEffect(() => {

    const timer = setTimeout(
      () =>
        setDebouncedValue(value),
      delay
    );

    return () =>
      clearTimeout(timer);

  }, [value, delay]);

  return debouncedValue;
}