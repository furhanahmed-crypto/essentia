"use client";

import { useCallback, useState } from "react";

/** Active item plus the one it replaced, so the outgoing image can stay underneath the wipe. */
export function useStageIndex(initial = 0) {
  const [state, setState] = useState({ active: initial, previous: -1 });

  const select = useCallback((index: number) => {
    setState((current) => (current.active === index ? current : { active: index, previous: current.active }));
  }, []);

  const layerState = (index: number): "active" | "previous" | "idle" => {
    if (index === state.active) return "active";
    if (index === state.previous) return "previous";
    return "idle";
  };

  return { active: state.active, select, layerState };
}

/** Arrow / Home / End keys for a tablist; returns the next index or null when the key is not handled. */
export function nextTabIndex(key: string, current: number, count: number, vertical: boolean): number | null {
  const back = vertical ? "ArrowUp" : "ArrowLeft";
  const forward = vertical ? "ArrowDown" : "ArrowRight";
  if (key === forward) return (current + 1) % count;
  if (key === back) return (current - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}
