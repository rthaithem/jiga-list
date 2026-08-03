export type Flag = "recommended" | "mirror" | "ads" | "nsfw" | "open-source" | "no-ads" | "free" | "premium" | "verified" | "down" | "legal";

export interface Mirror {
  label: string;
  url: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  flags: Flag[];
  mirrors?: Mirror[];
  categories: string[];
}

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  count: number;
}

export const FLAG_LABELS: Record<Flag, string> = {
  recommended: "Recommended",
  mirror: "Mirror",
  ads: "Ads",
  nsfw: "NSFW",
  "open-source": "Open Source",
  "no-ads": "No Ads",
  free: "Free",
  premium: "Premium",
  verified: "Verified",
  down: "Down",
  legal: "Legal",
};
