"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center text-cream",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "absolute left-1 top-0 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-line hover:bg-ink-soft transition-colors"
        ),
        button_next: cn(
          "absolute right-1 top-0 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-line hover:bg-ink-soft transition-colors"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-soft rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative flex-1 flex items-center justify-center [&:has([aria-selected])]:bg-gold/20 [&:has([aria-selected])]:rounded-md",
        day_button: cn(
          "h-9 w-9 p-0 font-normal rounded-md hover:bg-gold/15 hover:text-cream focus:bg-gold/20 focus:text-cream transition-colors aria-disabled:opacity-30 aria-disabled:hover:bg-transparent"
        ),
        selected: "bg-gold text-ink hover:bg-gold hover:text-ink focus:bg-gold focus:text-ink font-semibold",
        today: "border border-gold/50 text-gold",
        outside: "text-muted-soft opacity-50",
        disabled: "text-muted-soft opacity-30",
        range_start: "rounded-l-md",
        range_end: "rounded-r-md",
        range_middle: "rounded-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
