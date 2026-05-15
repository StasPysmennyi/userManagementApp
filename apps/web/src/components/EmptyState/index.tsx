import { motion } from 'motion/react';

import { Icons } from 'src/components';

type Props = {
  title: string;
  description?: string;
};

export const EmptyState = ({ title, description }: Props) => (
  <motion.div
    className="flex flex-col items-center justify-center py-16 text-center"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.25 }}>
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
      <Icons.UserIcon width={32} height={32} fill="#94a3b8" />
    </div>

    <h3 className="mb-1 text-base font-semibold text-slate-700">{title}</h3>
    {description && <p className="text-sm text-slate-500">{description}</p>}
  </motion.div>
);
