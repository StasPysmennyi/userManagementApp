type Props = {
  width?: number;
  height?: number;
  fill?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
};

const ROTATION_CLASS: Record<NonNullable<Props['direction']>, string> = {
  up: 'rotate-180',
  down: 'rotate-0',
  left: 'rotate-90',
  right: '-rotate-90',
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
    className={`transition-transform duration-200 ${ROTATION_CLASS[direction]}`}>
    <path
      d="M6 9l6 6 6-6"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
