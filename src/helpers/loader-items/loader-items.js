function getLoaderItems(size) {
  return Array(size)
    .fill(1)
    .map((x, y) => x + y);
}

export default getLoaderItems;
