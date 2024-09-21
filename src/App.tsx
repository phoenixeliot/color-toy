import { useState, type ChangeEvent } from "react";
import "./App.css";
import SquareBoard from "./components/SquareBoard";
import { type RgbColor, hexToRgb } from "./utils/color";

function App() {
  const [colors, setColors] = useState<
    Record<"topLeft" | "topRight" | "bottomLeft" | "bottomRight", RgbColor>
  >({
    topLeft: hexToRgb("#e84340"),
    topRight: [78, 36, 118], // 4e2476
    bottomLeft: [255, 250, 94], // fffa5e
    bottomRight: [0, 209, 215], // 00d1d7
  });

  function setColor(positionName: string, hexColor: string) {
    console.log(`Updating color for ${positionName}`);
    setColors({
      ...colors,
      [positionName]: hexToRgb(hexColor),
    });
  }

  const handleColorChange =
    (position: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const hexColor = e.target.value;
      setColor(position, hexColor);
    };

  return (
    <>
      <div>(Click the corners to change their color)</div>
      <button
        onClick={() => {
          setColors({
            topLeft: [
              Math.random() * 255,
              Math.random() * 255,
              Math.random() * 255,
            ],
            topRight: [
              Math.random() * 255,
              Math.random() * 255,
              Math.random() * 255,
            ],
            bottomLeft: [
              Math.random() * 255,
              Math.random() * 255,
              Math.random() * 255,
            ],
            bottomRight: [
              Math.random() * 255,
              Math.random() * 255,
              Math.random() * 255,
            ],
          });
        }}
      >
        Randomize colors
      </button>
      <SquareBoard
        numRows={5}
        numCols={5}
        width={500}
        height={500}
        onChangeReferenceColor={(pos, color) => {
          console.log(`Changing color for position, ${JSON.stringify(pos)}`);
          switch (pos.x) {
            case 0:
              switch (pos.y) {
                case 0:
                  return setColor("topLeft", color);
                default:
                  return setColor("bottomLeft", color);
              }
            default:
              switch (pos.y) {
                case 0:
                  return setColor("topRight", color);
                default:
                  return setColor("bottomRight", color);
              }
          }
        }}
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

export default App;
