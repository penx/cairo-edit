import { Pixel } from './Pixel';
import React from 'react';

export const Grid = ({
  bitmap,
  onPixelClick
}: {
  bitmap: (0 | 1 | 2)[][];
  onPixelClick: (rowClicked: number, columnClicked: number) => void;
}) => {
  return (
    <>
      {bitmap.map((rowData, rowIndex) => {
        return (
          <React.Fragment key={rowIndex}>
            {rowData.map((columnData, columnIndex) => (
              <Pixel
                key={columnIndex}
                value={columnData}
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                onClick={() => {
                  onPixelClick(rowIndex, columnIndex);
                }}
              />
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
};
