import Svg, { Path } from 'react-native-svg';

import { COLORS } from 'src/constants';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const BackIcon = ({
  width = 24,
  height = 24,
  fill = COLORS.textDark,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackIcon;
