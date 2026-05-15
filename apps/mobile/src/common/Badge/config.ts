import { ENUMS } from 'src/models';

import styles from './styles';

export const ROLE_STYLES: Record<
  ENUMS.Role,
  { container: object; text: object }
> = {
  [ENUMS.Role.STAFF]: {
    container: styles.staffContainer,
    text: styles.staffText,
  },
  [ENUMS.Role.MEMBER]: {
    container: styles.memberContainer,
    text: styles.memberText,
  },
};
