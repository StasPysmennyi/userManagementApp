import { TYPES } from 'src/models';

import styles from './styles';

export const VARIANT_STYLES_CONFIG: Record<
  TYPES.Variant,
  { container: object; text: object }
> = {
  primary: { container: styles.primaryContainer, text: styles.primaryText },
  secondary: {
    container: styles.secondaryContainer,
    text: styles.secondaryText,
  },
  danger: { container: styles.dangerContainer, text: styles.dangerText },
  ghost: { container: styles.ghostContainer, text: styles.ghostText },
};
