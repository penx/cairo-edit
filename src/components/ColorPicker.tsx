import { TwitterPicker } from 'react-color';
import { Box } from '@modulz/design-system';

export const ColorPicker = ({
  color,
  onChange
}: {
  color: string;
  onChange: (color: string) => void;
}) => (
  <Box>
    <TwitterPicker
      styles={{
        default: {
          card: {
            boxShadow: 'none',
            background: 'none',
          },
          input: {
            color: 'inherit',
          }
        }
      }}
      color={color}
      triangle='hide'
      onChangeComplete={({ hex }: { hex: string }) => onChange(hex)}
    />
  </Box>
);
