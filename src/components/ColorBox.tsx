import {
    Box,
  } from '@modulz/design-system';
  
  export const ColorBox = ({ color }: { color: string }) => (
  <Box
    css={{
      mr: '$1',
      backgroundColor: color,
      width: '$2',
      height: '$2'
    }}
  />
);
