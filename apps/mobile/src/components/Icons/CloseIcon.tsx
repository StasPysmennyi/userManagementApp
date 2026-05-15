import Svg, { Line } from 'react-native-svg';

import { COLORS } from 'src/constants';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const CloseIcon = ({
  width = 24,
  height = 24,
  fill = COLORS.textMuted,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default CloseIcon;
