import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { cn } from "cn";

// shadcn accordion (base-nova, Base UI), restyled for the Essentia editorial system: no rounded
// corners or chevrons, a hairline plus that turns into a cross, and a smooth height transition
// driven by Base UI's --accordion-panel-height.

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex w-full flex-col", className)} {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={className} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 cursor-pointer items-baseline text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          strokeWidth={1.25}
          className="size-5 shrink-0 self-center text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open/accordion-trigger:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

type AccordionContentProps = Omit<AccordionPrimitive.Panel.Props, "className"> & {
  /** Classes for the inner wrapper (spacing, type), kept off the animated panel. */
  className?: string;
};

function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={className}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
