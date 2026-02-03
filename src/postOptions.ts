export const POST_CATEGORIES = ["Offer", "Request", "Announcement"] as const;

export const STATUS_OPTIONS = [
  "Available",
  "Unavailable",
  "Pending",
  "Completed",
] as const;

const STATUS_COLOR_MAP: Record<(typeof STATUS_OPTIONS)[number], string> = {
  Available: "text-green-600",
  Unavailable: "text-red-600",
  Pending: "text-yellow-600",
  Completed: "text-blue-600",
};

export const getStatusColor = (status: string) =>
  STATUS_COLOR_MAP[status as (typeof STATUS_OPTIONS)[number]] ??
  "text-foreground";
