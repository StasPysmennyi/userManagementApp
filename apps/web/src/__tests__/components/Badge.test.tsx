// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from 'src/components/ui/Badge';

import { ENUMS } from 'src/models';

describe('Badge', () => {
  it('renders Staff label for STAFF role', () => {
    render(<Badge role={ENUMS.Role.STAFF} />);
    expect(screen.getByText(ENUMS.Role.STAFF)).toBeInTheDocument();
  });

  it('renders Member label for MEMBER role', () => {
    render(<Badge role={ENUMS.Role.MEMBER} />);
    expect(screen.getByText(ENUMS.Role.MEMBER)).toBeInTheDocument();
  });

  it('applies correct Tailwind classes per role', () => {
    const { rerender } = render(<Badge role={ENUMS.Role.STAFF} />);
    expect(screen.getByText(ENUMS.Role.STAFF)).toHaveClass(
      'bg-indigo-100',
      'text-indigo-700',
    );

    rerender(<Badge role={ENUMS.Role.MEMBER} />);
    expect(screen.getByText(ENUMS.Role.MEMBER)).toHaveClass(
      'bg-emerald-100',
      'text-emerald-700',
    );
  });
});
