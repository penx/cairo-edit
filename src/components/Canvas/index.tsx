import { styled } from '@modulz/design-system';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Grid } from './Grid';
import { bitmapState, colorBottomState, colorTopState, writeValueState } from '../../recoil/canvas/atom';
import { useCallback } from 'react';

export const Canvas = () => {
  const [bitmap, setBitmap] = useRecoilState(bitmapState);
  const colorTop = useRecoilValue(colorTopState);
  const colorBottom = useRecoilValue(colorBottomState);
  const [writeValue, setWriteValue] = useRecoilState(writeValueState);


  const handleMouseDown = useCallback((rowClicked, columnClicked) => {
    setBitmap((b) => {
      const currentValue = b[rowClicked][columnClicked];
      const newWriteValue = ((currentValue + 1) % 3) as 0 | 1 | 2;
      setWriteValue(newWriteValue);
      return b.map((rowData, rowIndex) =>
        rowClicked !== rowIndex
          ? rowData
          : rowData.map((columnData, columnIndex) =>
              columnIndex === columnClicked ? newWriteValue : columnData
            )
      );
    });
  }, []);

  const handleMouseOver = useCallback(
    (rowClicked, columnClicked) => {
      if (writeValue != null) {
        setBitmap((b) =>
          b.map((rowData, rowIndex) =>
            rowClicked !== rowIndex
              ? rowData
              : rowData.map((columnData, columnIndex) =>
                  columnIndex === columnClicked ? writeValue : columnData
                )
          )
        );
      }
    },
    [writeValue]
  );

  const clearWriteValue = useCallback(() => {
    setWriteValue(null);
  }, []);

  return (
    <Svg
      id='canvas'
      viewBox={`0 0 ${bitmap[0].length * 20} ${bitmap.length * 20}`}
      shapeRendering='crispEdges'
      onMouseUp={clearWriteValue}
      onMouseLeave={clearWriteValue}
    >
      <defs>
        <linearGradient id='background' x1='0' x2='0' y1='0' y2='1'>
          <stop offset='0%' stopColor={colorTop} />
          <stop offset='100%' stopColor={colorBottom} />
        </linearGradient>
      </defs>
      <rect
        width={bitmap[0].length * 20}
        height={bitmap.length * 20}
        fill='url(#background)'
      />
      <Grid
        bitmap={bitmap}
        onPixelMouseDown={handleMouseDown}
        onPixelMouseOver={handleMouseOver}
      />
    </Svg>
  );
};

const Svg = styled('svg', {
  userSelect: 'none',
  maxWidth: '90vw',
  maxHeight: '60vh',
  width: 'min(60vh, 90vw)',
  height: 'min(60vh, 90vw)'
});
