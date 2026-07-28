const wideProgramImages = new Set([
  "/images/UNIVAMEX26.png",
  "/images/EVENTOS1.png",
]);

export function getProgramImageDimensions(image: string) {
  return wideProgramImages.has(image)
    ? { height: 941, width: 1672 }
    : { height: 1200, width: 1600 };
}
