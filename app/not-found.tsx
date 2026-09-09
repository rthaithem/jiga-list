"use client";

import Link from "next/link";
import { FileQuestion, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-3 px-4 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileQuestion className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-bold">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        This resource or category doesn&apos;t exist in the index. It may have
        been moved or removed.
      </p>
      <div className="flex items-center gap-2 mt-2">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          }}
          className="gap-1.5"
        >
          <RotateCcw className="h-4 w-4" />
          Reload
        </Button>
      </div>
    </div>
  );
}
