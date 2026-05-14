type Props = {
  width?: number;
  height?: number;
  fill?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
};

const ROTATION: Record<NonNullable<Props['direction']>, number> = {
  up: 180,
  down: 0,
  left: 90,
  right: -90,
};

export const ChevronIcon = ({
  width = 20,
  height = 20,
  fill = 'currentColor',
  direction = 'down',
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: `rotate(${ROTATION[direction]}deg)`,
      transition: 'transform 0.2s',
    }}>
    <path
      d="M6 9l6 6 6-6"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
