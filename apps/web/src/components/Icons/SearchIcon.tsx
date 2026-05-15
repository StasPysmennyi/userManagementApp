type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

export const SearchIcon = ({
  width = 20,
  height = 20,
  fill = 'currentColor',
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke={fill} strokeWidth={2} />
    <path
      d="M21 21l-4.35-4.35"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
