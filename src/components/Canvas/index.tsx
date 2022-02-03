import { styled } from '@modulz/design-system';

import { Grid } from './Grid';

export const Canvas = ({
  bitmap,
  onPixelClick,
  colorTop,
  colorBottom
}: {
  bitmap: (0 | 1 | 2)[][];
  onPixelClick: (rowClicked: number, columnClicked: number) => void;
  colorTop: string;
  colorBottom: string;
}) => (
  <Svg
    id='canvas'
    viewBox={`0 0 ${bitmap.length * 20} ${bitmap[0].length * 20}`}
    shapeRendering='crispEdges'
  >
    <defs>
      <linearGradient id='background' x1='0' x2='0' y1='0' y2='1'>
        <stop offset='0%' stopColor={colorTop} />
        <stop offset='100%' stopColor={colorBottom} />
      </linearGradient>
    </defs>
    <rect
      width={bitmap.length * 20}
      height={bitmap[0].length * 20}
      fill='url(#background)'
    />
    <Grid bitmap={bitmap} onPixelClick={onPixelClick} />
  </Svg>
);

const Svg = styled('svg', {
  userSelect: 'none',
  maxWidth: '90vw',
  maxHeight: '60vh'
});
