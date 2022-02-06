import { styled } from '@modulz/design-system';

import { Grid } from './Grid';

export const Canvas = ({
  bitmap,
  onPixelMouseDown,
  onPixelMouseOver,
  onMouseUp,
  onMouseLeave,
  colorTop,
  colorBottom
}: {
  bitmap: (0 | 1 | 2)[][];
  onPixelMouseDown: (rowClicked: number, columnClicked: number) => void;
  onPixelMouseOver?: (rowClicked: number, columnClicked: number) => void;
  onMouseUp: React.MouseEventHandler,
  onMouseLeave: React.MouseEventHandler,
  colorTop: string;
  colorBottom: string;
}) => (
  <Svg
    id='canvas'
    viewBox={`0 0 ${bitmap[0].length * 20} ${bitmap.length * 20}`}
    shapeRendering='crispEdges'
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
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
    <Grid bitmap={bitmap} onPixelMouseDown={onPixelMouseDown} onPixelMouseOver={onPixelMouseOver} />
  </Svg>
);

const Svg = styled('svg', {
  userSelect: 'none',
  maxWidth: '90vw',
  maxHeight: '60vh',
  width: 'min(60vh, 90vw)',
  height: 'min(60vh, 90vw)',
});
