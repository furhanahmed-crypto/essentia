"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent } from "react";
import { cn } from "cn";
import { nextTabIndex } from "@/hooks/useStageIndex";
import { treatmentCount } from "@/constants/services";
import type { ServiceCategory } from "@/types/services";
import { indexOf } from "@/utils/emphasis";

interface ServiceTabsProps {
  services: readonly ServiceCategory[];
  active: number;
  onSelect: (index: number) => void;
  /** "list" = desktop vertical index; "tiles" = mobile horizontal photo row. */
  variant: "list" | "tiles";
  panelId: string;
}

export function ServiceTabs({ services, active, onSelect, variant, panelId }: ServiceTabsProps) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const vertical = variant === "list";

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = nextTabIndex(event.key, active, services.length, vertical);
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Service families"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      onKeyDown={onKeyDown}
      className={cn(vertical ? "flex flex-col" : "no-scrollbar -mx-[var(--es-gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--es-gutter)]")}
    >
      {services.map((service, index) => {
        const selected = index === active;
        return (
          <button
            key={service.slug}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${panelId}-tab-${index}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(index)}
            onMouseEnter={vertical ? () => onSelect(index) : undefined}
            className={cn(
              "group text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
              vertical ? "flex items-baseline gap-5 py-3" : "w-36 shrink-0 snap-start",
            )}
          >
            {vertical ? (
              <>
                <span className={cn("type-kicker tabular-nums transition-colors", selected ? "text-em" : "text-night-ink/35")}>
                  {indexOf(index + 1)}
                </span>
                <span
                  className={cn(
                    "font-heading text-[clamp(2rem,1rem+2.4vw,3.6rem)] leading-none tracking-tight transition-[color,transform] duration-500",
                    selected ? "translate-x-2 text-night-ink" : "text-night-ink/30 group-hover:text-night-ink/60",
                  )}
                >
                  {service.name}
                </span>
                <span className={cn("ml-auto type-kicker text-night-ink/50 transition-opacity", selected ? "opacity-100" : "opacity-0")}>
                  {treatmentCount(service)}
                </span>
              </>
            ) : (
              <>
                <span className={cn("relative block aspect-[3/4] overflow-hidden transition-opacity", selected ? "opacity-100" : "opacity-55")}>
                  <Image src={service.image} alt="" fill sizes="144px" className="object-cover" />
                </span>
                <span className={cn("mt-3 block font-heading text-xl", selected ? "text-night-ink" : "text-night-ink/55")}>
                  {service.name}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
