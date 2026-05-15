import { type ReactNode } from 'react';

import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';

import { Icons } from 'src/components';

import { classNames } from 'src/utils';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <Icons.UserIcon width={22} height={22} fill="#6366f1" />
            <span>User Management</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={classNames(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive('/')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-600 hover:bg-slate-100',
              )}>
              Users
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
};
