import { useState, type ChangeEvent } from "react";
import "./App.css";
import SquareBoard from "./components/SquareBoard";
import type { RgbColor } from "./types";

function App() {
  const [colors, setColors] = useState<
    Record<"topLeft" | "topRight" | "bottomLeft" | "bottomRight", RgbColor>
  >({
    topLeft: [183, 32, 16], // b72010
    topRight: [78, 36, 118], // 4e2476
    bottomLeft: [255, 250, 94], // fffa5e
    bottomRight: [0, 209, 215], // 00d1d7
  });

  const handleColorChange =
    (position: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const hexColor = e.target.value;
      setColors({
        ...colors,
        [position]: hexToRgb(hexColor),
      });
    };

  return (
    <>
      <input
        type="color"
        value={rgbToHex(colors["topLeft"])}
        onChange={handleColorChange("topLeft")}
      />
      <input
        type="color"
        value={rgbToHex(colors["topRight"])}
        onChange={handleColorChange("topRight")}
      />
      <input
        type="color"
        value={rgbToHex(colors["bottomLeft"])}
        onChange={handleColorChange("bottomLeft")}
      />
      <input
        type="color"
        value={rgbToHex(colors["bottomRight"])}
        onChange={handleColorChange("bottomRight")}
      />

      <SquareBoard
        numRows={5}
        numCols={5}
        width={500}
        height={500}
        // referenceColorPositions={[
        //   { position: { x: 0, y: 0 }, color: [0, 0, 0] },
        //   { position: { x: 5, y: 0 }, color: [5, 0, 0] },
        //   { position: { x: 0, y: 5 }, color: [0, 5, 0] },
        //   { position: { x: 5, y: 5 }, color: [5, 5, 5] },
        // ]}
        referenceColorPositions={colors}
      />
    </>
  );
}

function hexToRgb(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return [r, g, b];
}
function rgbToHex(rgbColor: RgbColor) {
  return "#" + rgbColor.map((v: number) => v.toString(16)).join("");
}

export default App;
