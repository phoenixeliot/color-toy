export type RgbColor = [number, number, number];
export type Position = { x: number; y: number };
export type ColorPosition = {
  position: Position;
  color: RgbColor;
};

export function hexToRgb(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return [r, g, b];
}
export function rgbToHex(rgbColor: RgbColor) {
  return "#" + rgbColor.map((v: number) => v.toString(16)).join("");
}
