import { useState, type ChangeEvent } from "react";
import "./App.css";
import SquareBoard from "./components/SquareBoard";
import { hexToRgb, type RgbColor } from "./utils/color";
import { useWindowSize } from "./utils/useWindowSize";

function App() {
  const windowSize = useWindowSize();
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
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
            ],
            topRight: [
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
            ],
            bottomLeft: [
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
            ],
            bottomRight: [
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
              Math.floor(Math.random() * 256),
            ],
          });
        }}
      >
        Randomize colors
      </button>
      <SquareBoard
        numRows={5}
        numCols={5}
        width={Math.min((windowSize.width || Infinity) - 80, 500)}
        height={Math.min((windowSize.height || Infinity) - 100, 500)}
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
        referenceColorPositions={colors}
      />
    </>
  );
}

export default App;
