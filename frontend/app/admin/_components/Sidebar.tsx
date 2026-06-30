'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { handleLogout } from '@/lib/actions/auth-action';
import LogoutConfirmationModal from '@/app/components/LogoutConfirmationModal';
import { 
  ChartBarIcon, 
  UsersIcon, 
  MegaphoneIcon, 
  CalendarIcon, 
  CubeIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import {
  ChartBarIcon as ChartBarIconSolid, 
  UsersIcon as UsersIconSolid, 
  MegaphoneIcon as MegaphoneIconSolid, 
  CalendarIcon as CalendarIconSolid, 
  CubeIcon as CubeIconSolid, 
  UserCircleIcon as UserCircleIconSolid
} from '@heroicons/react/24/solid';

const navItems = [
  { label: 'Dashboard', iconOutline: ChartBarIcon, iconSolid: ChartBarIconSolid, href: '/admin' },
  { label: 'User Management', iconOutline: UsersIcon, iconSolid: UsersIconSolid, href: '/admin/users' },
  { label: 'Campaign Management', iconOutline: MegaphoneIcon, iconSolid: MegaphoneIconSolid, href: '/admin/campaigns' },
  { label: 'Appointments', iconOutline: CalendarIcon, iconSolid: CalendarIconSolid, href: '/admin/appointments' },
  { label: 'Inventory', iconOutline: CubeIcon, iconSolid: CubeIconSolid, href: '/admin/inventory' },
  { label: 'Reports', iconOutline: ChartBarIcon, iconSolid: ChartBarIconSolid, href: '/admin/reports' },
  { label: 'Profile', iconOutline: UserCircleIcon, iconSolid: UserCircleIconSolid, href: '/admin/profile' },
];

export default function AdminSideBar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = async () => {
    try {
      await handleLogout();
      toast.success('Logged out successfully');
    } catch (error: any) {
      if (error.message?.includes('NEXT_REDIRECT') || error.digest) {
        return;
      }
      toast.error(error.message || 'Logout failed');
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <aside className="w-72 glass border-r border-slate-200/50 dark:border-zinc-800/50 flex flex-col shrink-0 h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] z-40 transition-all duration-300 ease-in-out">
        {/* Logo Area */}
        <div className="p-8 flex items-center gap-4 border-b border-slate-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md">
          <div className="w-10 h-10 relative bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 group hover:shadow-md transition-all duration-300">
            <Image
              src="/images/logo.jpg"
              alt="LifeLine Logo"
              fill
              className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent leading-tight tracking-tight">LifeLine</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary mt-0.5">Admin Workspace</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            const Icon = isActive ? item.iconSolid : item.iconOutline;
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 dark:shadow-primary/20 scale-[1.02]'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                )}
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-slate-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-md">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="group flex w-full items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 font-semibold"
          >
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors">
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </div>
            <span className="text-sm">Secure Logout</span>
          </button>
        </div>
      </aside>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}