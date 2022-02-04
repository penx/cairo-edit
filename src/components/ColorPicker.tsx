import { TwitterPicker } from 'react-color';

export const ColorPicker = ({
    color,
    onChange
}: {
    color: string;
    onChange: (color: string) => void;
}) => (
  <TwitterPicker
    color={color}
    triangle='hide'
    onChangeComplete={({ hex }: { hex: string }) => onChange(hex)}
  />
);
