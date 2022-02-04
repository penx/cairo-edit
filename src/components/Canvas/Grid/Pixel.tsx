import React from 'react'

import { styled } from '@modulz/design-system';

const Rect = styled('rect', {
  '&:hover': {
    stroke: '#999'
  }
});

export const Pixel = React.memo(({
  value,
  onMouseDown,
  onPixelMouseOver,
  rowIndex,
  columnIndex
}: {
  value: 0 | 1 | 2;
  onMouseDown: React.MouseEventHandler;
  onPixelMouseOver?: React.MouseEventHandler;
  rowIndex: number;
  columnIndex: number;
}) => {
  return (
    <>
      <Rect
        fill={value === 1 ? 'black' : value === 2 ? 'white' : 'transparent'}
        onMouseDown={onMouseDown}
        onMouseOver={onPixelMouseOver}
        strokeWidth={2}
        stroke={value === 1 ? 'black' : value === 2 ? 'white' : 'transparent'}
        width={18}
        height={18}
        x={columnIndex * 20}
        y={rowIndex * 20}
      />
    </>
  );
});
