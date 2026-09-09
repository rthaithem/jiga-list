"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client errors in non-production environments
    console.error("App boundary caught error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-3 px-4 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground">
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      <div className="flex items-center gap-2 mt-3">
        <Button onClick={() => reset()} className="gap-1.5">
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          }}
        >
          Go to home
        </Button>
      </div>
    </div>
  );
}
