'use client';

import Head from 'next/head';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function AppointmentsPage() {
  return (
    <>
      <Head>
        <title>Appointments | Admin Dashboard</title>
      </Head>

      <header className="h-20 glass border-b border-slate-200/50 dark:border-zinc-800/50 flex items-center px-8 shrink-0 z-30 sticky top-0">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
          Appointments Management
        </h1>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CalendarIcon className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Coming Soon</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            The appointments management system is currently under development. Please check back later!
          </p>
        </div>
      </div>
    </>
  );
}
