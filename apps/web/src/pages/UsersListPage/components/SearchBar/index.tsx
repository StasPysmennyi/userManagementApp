import { type ChangeEvent } from 'react';

import { Icons } from 'src/components';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, onChange }: Props) => (
  <div className="relative">
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
      <Icons.SearchIcon width={16} height={16} fill="#94a3b8" />
    </span>
    <input
      value={value}
      onChange={onChange}
      placeholder="Search users..."
      className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
    />
  </div>
);

export { SearchBar };
