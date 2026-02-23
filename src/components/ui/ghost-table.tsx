import * as React from "react"

import { cn } from "@/lib/utils"

const GhostTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm border-separate border-spacing-y-[2px] border-spacing-x-0", className)}
      {...props}
    />
  </div>
))
GhostTable.displayName = "GhostTable"

const GhostTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_th]:bg-muted [&_th:first-child]:rounded-l-lg [&_th:last-child]:rounded-r-lg", className)} {...props} />
))
GhostTableHeader.displayName = "GhostTableHeader"

const GhostTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child_td]:border-0 [&_tr:has(+_tr:hover)_td]:border-b-transparent", className)}
    {...props}
  />
))
GhostTableBody.displayName = "GhostTableBody"

const GhostTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
GhostTableFooter.displayName = "GhostTableFooter"

const GhostTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:[&_td]:bg-muted data-[state=selected]:bg-muted hover:[&_td]:border-b-transparent hover:[&_td:first-child]:rounded-l-lg hover:[&_td:last-child]:rounded-r-lg",
      className
    )}
    {...props}
  />
))
GhostTableRow.displayName = "GhostTableRow"

const GhostTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-auto px-4 py-3 text-left align-top text-xs font-semibold text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
GhostTableHead.displayName = "GhostTableHead"

const GhostTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "py-3 px-4 align-top !leading-5 tracking-[-0.5px] [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
GhostTableCell.displayName = "GhostTableCell"

const GhostTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
GhostTableCaption.displayName = "GhostTableCaption"

export {
  GhostTable,
  GhostTableHeader,
  GhostTableBody,
  GhostTableFooter,
  GhostTableHead,
  GhostTableRow,
  GhostTableCell,
  GhostTableCaption,
}
