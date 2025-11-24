import React, { useState } from "react";

const ColumnTable = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  const getZigZagGrid = () => {
    let count = 1;
    let grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );

    for (let col = 0; col < cols; col++) {
      if (col % 2 === 0) {
        for (let row = 0; row < rows; row++) {
          grid[row][col] = count++;
        }
      } else {
        for (let row = rows - 1; row >= 0; row--) {
          grid[row][col] = count++;
        }
      }
    }
    return grid;
  };

  const boxes = getZigZagGrid();

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <div className="flex gap-12">
        <div className="flex justify-center items-center">
          <p>Rows ::{rows}</p>
          <input
            type="range"
            min={2}
            max={8}
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center">
          <p>Columns ::{cols}</p>
          <input
            type="range"
            min={2}
            max={8}
            value={cols}
            onChange={(e) => setCols(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-20">
        {boxes.map((rowArr, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {rowArr.map((num, colIndex) => (
              <div
                key={colIndex}
                className="border h-16 w-16 flex items-center justify-center"
              >
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnTable;
