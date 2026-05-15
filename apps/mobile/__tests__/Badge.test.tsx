import React from 'react';

import { render, screen } from '@testing-library/react-native';

import Badge from '../src/common/Badge';
import { ENUMS } from '../src/models';

describe('Badge', () => {
  it('renders STAFF role label', () => {
    render(<Badge role={ENUMS.Role.STAFF} />);
    expect(screen.getByText(ENUMS.Role.STAFF)).toBeTruthy();
  });

  it('renders MEMBER role label', () => {
    render(<Badge role={ENUMS.Role.MEMBER} />);
    expect(screen.getByText(ENUMS.Role.MEMBER)).toBeTruthy();
  });

  it('applies different styles for each role', () => {
    const { toJSON: staffJSON } = render(<Badge role={ENUMS.Role.STAFF} />);
    const { toJSON: memberJSON } = render(<Badge role={ENUMS.Role.MEMBER} />);
    expect(JSON.stringify(staffJSON())).not.toBe(JSON.stringify(memberJSON()));
  });
});
