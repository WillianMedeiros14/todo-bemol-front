export function formatLastEditedAgo(createdAt: Date) {
  const now = Date.now();
  const createdTimestamp = new Date(createdAt).getTime();
  const elapsedMilliseconds = now - createdTimestamp;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays === 0) {
    return "hoje";
  } else if (elapsedDays === 1) {
    return "ontem";
  } else {
    return `há ${elapsedDays} dias`;
  }
}
