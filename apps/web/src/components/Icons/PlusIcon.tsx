type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

export const PlusIcon = ({
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
    <path
      d="M12 5v14M5 12h14"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
