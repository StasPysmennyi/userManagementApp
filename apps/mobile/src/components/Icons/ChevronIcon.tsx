import Svg, { Path } from 'react-native-svg';

import { COLORS } from 'src/constants';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const ChevronIcon = ({
  width = 20,
  height = 20,
  fill = COLORS.textDisabled,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9l6 6 6-6"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronIcon;
