export function sortMediaByPosition(mediaPosition: string[], media: any[]) {
  if (mediaPosition.length === 0 || media.length === 0) {
    return [];
  }

  const mediaMap = media.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});

  const sortedMedia = mediaPosition
    .map((id) => mediaMap[id])
    .filter((item) => item !== undefined);

  return sortedMedia;
}
