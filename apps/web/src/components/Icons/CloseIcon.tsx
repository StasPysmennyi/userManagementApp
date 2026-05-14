type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

export const CloseIcon = ({
  width = 20,
  height = 20,
  stroke = 'currentColor',
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
