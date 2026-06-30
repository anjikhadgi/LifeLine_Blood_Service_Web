'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import {
  BellIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  UsersIcon,
  CalendarIcon,
  CubeIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { getProfilePictureUrl } from '@/lib/utils/imageUrl';
import { handleGetAdminDashboardStats } from '@/lib/actions/admin/stats-action';
import NotificationDropdown from '@/app/components/NotificationDropdown';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalDonors: 0,
    ongoingCampaigns: 0,
    totalBloodUnits: 0,
    totalRegisteredOrganizations: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      router.push('/login');
      return;
    }
    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'admin') {
        router.push('/');
        return;
      }
      setCurrentUser(userData);
    } catch {
      router.push('/login');
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchDashboardStats = async () => {
      setIsStatsLoading(true);
      try {
        const response = await handleGetAdminDashboardStats();
        if (response.success && response.data) {
          setStatsData(response.data);
        } else {
          toast.error(response.message || 'Failed to load dashboard stats');
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard stats');
      } finally {
        setIsStatsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [isAuthorized]);

  if (!isAuthorized) return null;

  const stats = [
    {
      icon: <UsersIcon className="w-7 h-7" />,
      label: 'Total Donors',
      value: isStatsLoading ? '...' : statsData.totalDonors.toLocaleString(),
      gradient: 'from-rose-500 to-red-600',
      shadow: 'shadow-red-500/30'
    },
    {
      icon: <CalendarIcon className="w-7 h-7" />,
      label: 'Ongoing Campaigns',
      value: isStatsLoading ? '...' : statsData.ongoingCampaigns.toLocaleString(),
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/30'
    },
    {
      icon: <CubeIcon className="w-7 h-7" />,
      label: 'Blood Units Total',
      value: isStatsLoading ? '...' : statsData.totalBloodUnits.toLocaleString(),
      gradient: 'from-violet-500 to-purple-600',
      shadow: 'shadow-purple-500/30'
    },
    {
      icon: <HeartIcon className="w-7 h-7" />,
      label: 'Registered Organizations',
      value: isStatsLoading ? '...' : statsData.totalRegisteredOrganizations.toLocaleString(),
      gradient: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-teal-500/30'
    },
  ];

  return (
    <>
      <Head>
        <title>LifeLine Blood Service | Admin Dashboard</title>
      </Head>

      {/* Header */}
      <header className="h-20 glass border-b border-slate-200/50 dark:border-zinc-800/50 flex items-center justify-between px-8 shrink-0 z-30 sticky top-0">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md group">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              className="w-full rounded-2xl border-0 py-3 pl-12 pr-4 text-sm bg-slate-100/50 dark:bg-zinc-800/50 backdrop-blur-md placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-300"
              placeholder="Search data, requests, or activity..."
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <NotificationDropdown />
          <button className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all duration-300">
            <QuestionMarkCircleIcon className="w-6 h-6" />
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-zinc-800 mx-1"></div>

          <div className="flex items-center gap-3 cursor-pointer group rounded-xl p-1.5 pr-3 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all duration-300">
            {currentUser?.profilePicture ? (
              <img
                src={getProfilePictureUrl(currentUser.profilePicture) || undefined}
                alt="Profile"
                className="size-10 rounded-xl object-cover border border-slate-200 dark:border-zinc-700 shadow-sm"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40?text=A';
                }}
              />
            ) : (
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-black shadow-sm shadow-primary/30">
                {(currentUser?.fullName || 'A').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                {currentUser?.fullName || currentUser?.email || 'Admin'}
              </p>
              <p className="text-xs font-semibold text-slate-500">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 animate-fade-in relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">
                Dashboard Overview
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 font-medium">
                Real-time statistics and critical alerts for the LifeLine Blood Service network.
              </p>
            </div>
          </div>

          {/* Glowing Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`group relative p-6 rounded-3xl glass hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl delay-${(i+1)*100} animate-fade-in opacity-0`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg ${stat.shadow} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{stat.value}</p>
                  <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity Section */}
          <div className="animate-fade-in delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Recent Activity</h3>
            <div className="glass rounded-3xl p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] dark:via-white/5" />
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                  <BellIcon className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 dark:text-zinc-400 font-medium">No recent activity yet</p>
                <p className="text-sm text-slate-400 mt-1">Activities will appear here once users interact with the system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
