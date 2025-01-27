const colors = {
  "busy+": ["#800000", "#800000"],
  busy: ["#FF0000", "#FF0000"],
  "half-busy": ["#FF0000", "#FFFFFF"],
  light: ["#FF999C", "#FF999C"],
  empty: ["#FFFFFF", "#FFFFFF"],
  "not-open": ["grey", "grey"],
};

type Status = keyof typeof colors;

export default function stringToColors(status: string): string[] {
  // If the status is found in the colors object, return the corresponding colors.
  // Otherwise, return the colors for the "empty" status by default.
  return colors[status as Status] || colors["empty"];
}
