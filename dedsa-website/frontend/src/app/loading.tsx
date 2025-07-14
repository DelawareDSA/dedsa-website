'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      className="flex items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-dsa-red"></div>
    </motion.div>
  );
}
