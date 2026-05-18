// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EmptyState } from 'src/components/EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No users yet" />);
    expect(screen.getByText('No users yet')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <EmptyState title="No users yet" description="Create your first user" />,
    );
    expect(screen.getByText('Create your first user')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<EmptyState title="No users yet" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });
});
