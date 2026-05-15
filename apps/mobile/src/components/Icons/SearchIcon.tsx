import Svg, { Circle, Path } from 'react-native-svg';

import { COLORS } from 'src/constants';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const SearchIcon = ({
  width = 20,
  height = 20,
  fill = COLORS.placeholder,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={fill} strokeWidth={2} />
    <Path
      d="M21 21l-4.35-4.35"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default SearchIcon;
