"use client"
import Image from 'next/image';
import LoginForm from '../_components/LoginForm';
import Header from '@/app/(public)/_components/Header';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Image
          src="/images/loginpagebg.png"
          alt="Medical staff drawing blood"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="flex min-h-[calc(100vh-72px)] items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <section className="hidden lg:block">
              <div className="max-w-2xl space-y-6 text-white">
                <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur">
                  LifeLine Blood Service
                </div>
                <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white xl:text-6xl">
                  A faster way to connect blood donors with the people who need them.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-white/75">
                  Use a secure account to manage donations, track requests, and coordinate with your organization in one place.
                </p>

                <div className="grid max-w-xl gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                    <div className="text-2xl font-semibold text-white">24/7</div>
                    <div className="mt-1 text-sm text-white/70">Support availability</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                    <div className="text-2xl font-semibold text-white">Secure</div>
                    <div className="mt-1 text-sm text-white/70">Role-based access</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                    <div className="text-2xl font-semibold text-white">Fast</div>
                    <div className="mt-1 text-sm text-white/70">Donation workflow</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-center lg:justify-end">
              <LoginForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}