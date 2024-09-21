import { transpose, zip } from "ramda";
import type { CSSProperties } from "react";
import { rgbToHex, type Position, type RgbColor } from "../utils/color";

type Props = {
  numRows: number;
  numCols: number;
  width: number;
  height: number;
  // referenceColorPositions: ColorPosition[];
  onChangeReferenceColor: (pos: Position, color: string) => unknown;
  referenceColorPositions: {
    topLeft: RgbColor;
    topRight: RgbColor;
    bottomLeft: RgbColor;
    bottomRight: RgbColor;
  };
};

export default function SquareBoard({
  numRows,
  numCols,
  width: boardWidth,
  height: boardHeight,
  referenceColorPositions,
  onChangeReferenceColor,
}: Props) {
  const rowWidth = boardWidth / numCols;
  const rowHeight = boardHeight / numRows;
  const topRowColors = interpolateLine(
    referenceColorPositions.topLeft,
    referenceColorPositions.topRight,
    numCols
  );
  const bottomRowColors = interpolateLine(
    referenceColorPositions.bottomLeft,
    referenceColorPositions.bottomRight,
    numCols
  );
  const gridColors = transpose(
    zip(topRowColors, bottomRowColors).map(([a, b]) =>
      interpolateLine(a, b, numRows)
    )
  );
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: boardWidth,
        height: boardHeight,
      }}
    >
      {[...Array(numRows)].map((_, r) => (
        <div key={r}>
          {[...Array(numCols)].map((_, c) => {
            const color = gridColors[r][c];
            const startX = Math.floor(rowWidth * c);
            const startY = Math.floor(rowHeight * r);
            const endX = Math.floor(rowWidth * (c + 1));
            const endY = Math.floor(rowHeight * (r + 1));
            const cellWidth = endX - startX;
            const cellHeight = endY - startY;
            const extraPaddingForSeams = 1;

            const style: CSSProperties = {
              backgroundColor: `rgb(${color.join(",")})`,
              position: "absolute",
              width: cellWidth + extraPaddingForSeams,
              height: cellHeight + extraPaddingForSeams,
              left: rowWidth * c - extraPaddingForSeams / 2,
              top: rowHeight * r - extraPaddingForSeams / 2,
            };

            if (
              (r === 0 || r === numRows - 1) &&
              (c === 0 || c === numCols - 1)
            ) {
              return (
                <label key={c} style={style}>
                  <input
                    style={{ opacity: 0 }}
                    value={rgbToHex(color)}
                    type="color"
                    onChange={(e) =>
                      onChangeReferenceColor({ x: c, y: r }, e.target.value)
                    }
                  />
                </label>
              );
            }
            return (
              <div key={c} style={style}>
                {/* {r}, {c} */}
                {/* <br /> */}
                {/* {color.join(",")} */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// inverse of distance
// exact on top of something = 1
// exactly on top of something else = 0
// if you're 1/3 of the way from A to B, you want 2 shares of A and 1 share of B
// when it's 2d,

// TODO: Try implementing https://en.wikipedia.org/wiki/Bilinear_interpolation

// function interpolate2d(colorPositions: ColorPosition[], position: Position) {
//   const distances = colorPositions.map((refColorPos) =>
//     distance(refColorPos.position, position)
//   );
//   const totalDistance = sum(distances);
//
//   // const w1 = ()
//
//   return colorPositions
//     .map((colorPos, i) => {
//       // This is wrong, need to do bilinear interpolation instead
//       return colorPos.color.map((v) => (v * distances[i]) / totalDistance);
//     })
//     .reduce((a, b) => zip(a, b).map(sum));
// }

// function matrixMultiply(mat1, mat2) {
//   const n =
//   // const res = []
//   for (let i = 0; i < 5; i++) {
//     for (let j = 0; j < N; j++) {
//       res[i][j] = 0;
//       for (let k = 0; k < N; k++) {
//         res[i][j] += mat1[i][k] * mat2[k][j];
//       }
//     }
//   }
// }

// function distance(pos1: Position, pos2: Position) {
//   return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
// }

// console.log(
//   interpolate2d(
//     [
//       { position: { x: 0, y: 0 }, color: [255, 0, 0] },
//       { position: { x: 0, y: 100 }, color: [0, 255, 0] },
//       { position: { x: 100, y: 0 }, color: [0, 0, 255] },
//       { position: { x: 100, y: 100 }, color: [255, 255, 255] },
//     ],
//     { x: 50, y: 50 }
//   )
// );

function interpolateLine(
  startColor: RgbColor,
  endColor: RgbColor,
  steps: number
): RgbColor[] {
  const pairs = zip(startColor, endColor);
  const interpolationPairs = pairs.map(([a, b]) => interpolate(a, b, steps));
  return transpose(interpolationPairs) as RgbColor[];
}

function interpolate(start: number, end: number, steps: number): RgbColor {
  const distance = end - start;
  const stepSize = distance / (steps - 1);
  return [...Array(steps)].map((_, i) => i * stepSize + start) as RgbColor;
}
