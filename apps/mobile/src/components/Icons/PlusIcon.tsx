import Svg, { Path } from 'react-native-svg';

import { COLORS } from 'src/constants';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const PlusIcon = ({ width = 20, height = 20, fill = COLORS.white }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
