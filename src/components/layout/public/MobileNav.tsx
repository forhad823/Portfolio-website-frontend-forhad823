"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ForhadLogo } from "./ForhadLogo";
import { HeaderNav } from "./HeaderNav";
import { contactInfo } from "@/data/contact";

/**
 * MobileNav — Sheet-based mobile navigation panel.
 *
 * "use client" is scoped to this file only; the parent Header remains
 * a Server Component. The Sheet closes when any nav link is clicked.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Hamburger trigger — only visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden text-foreground hover:text-primary"
      >
        <Menu size={22} aria-hidden="true" />
      </Button>

      <SheetContent
        side="right"
        className="glass-surface-strong flex w-72 flex-col border-l border-border p-0"
      >
        {/* Accessible title — visible to screen readers, logo shown visually */}
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <ForhadLogo height={30} aria-hidden="true" />
          <p className="mt-1 text-xs text-muted-foreground">
            {contactInfo.designation}
          </p>
        </SheetHeader>

        {/* Nav links — clicking any link closes the Sheet */}
        <div className="px-3 py-4">
          <HeaderNav vertical onLinkClick={() => setOpen(false)} />
        </div>

        {/* Resume CTA anchored to the bottom */}
        <div className="mt-auto border-t border-border px-5 py-4">
          <a
            href={contactInfo.resumeUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Download Resume
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
