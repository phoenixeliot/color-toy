export type RgbColor = [number, number, number];
export type Position = { r: number; c: number };
export type ColorPosition = {
  position: Position;
  color: RgbColor;
};

export function hexToRgb(hexColor: string) {
  return hexColor
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) as RgbColor;
}
export function rgbToHex(rgbColor: RgbColor) {
  return (
    "#" +
    rgbColor
      .map((v: number) => Math.floor(v).toString(16).padStart(2, "0"))
      .join("")
  );
}
