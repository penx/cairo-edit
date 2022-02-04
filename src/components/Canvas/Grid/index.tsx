import { Pixel } from './Pixel';
import React from 'react';

export const Grid = ({
  bitmap,
  onPixelMouseDown,
  onPixelMouseOver
}: {
  bitmap: (0 | 1 | 2)[][];
  onPixelMouseDown: (rowClicked: number, columnClicked: number) => void;
  onPixelMouseOver?: (rowClicked: number, columnClicked: number) => void;
}) => {
  return (
    <>
      {bitmap.map((rowData, rowIndex) => {
        return (
          <Row
            rowData={rowData}
            rowIndex={rowIndex}
            key={rowIndex}
            onPixelMouseDown={onPixelMouseDown}
            onPixelMouseOver={onPixelMouseOver}
          />
        );
      })}
    </>
  );
};

const Row =  React.memo(({
  rowData,
  rowIndex,
  onPixelMouseDown,
  onPixelMouseOver
}: {
  rowIndex: number;
  rowData: (0 | 1 | 2)[];
  onPixelMouseDown: (rowClicked: number, columnClicked: number) => void;
  onPixelMouseOver?: (rowClicked: number, columnClicked: number) => void;
}) => (
  <React.Fragment key={rowIndex}>
    {rowData.map((columnData, columnIndex) => (
      <Pixel
        key={columnIndex}
        value={columnData}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        onMouseDown={() => {
          onPixelMouseDown(rowIndex, columnIndex);
        }}
        onPixelMouseOver={onPixelMouseOver ? () => {
          onPixelMouseOver(rowIndex, columnIndex);
        }: undefined}
      />
    ))}
  </React.Fragment>
));
