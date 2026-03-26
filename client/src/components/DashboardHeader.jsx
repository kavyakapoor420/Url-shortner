import { Bell, LogOut, Search, Sparkles } from "lucide-react";

function DashboardHeader({ user, onLogout, loggingOut }) {
  return (
    <header className="mb-8 rounded-[32px] border border-white/10 bg-[#0d0d0e]/94 px-4 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:px-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between xl:w-full">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-white" />
            <div>
              <p className="eyebrow">Dashboard</p>
              <h1 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                Welcome back, {user?.name}
              </h1>
            </div>
          </div>

          <nav className="flex items-center gap-5 text-sm text-zinc-500">
            <span>Overview</span>
            <span className="font-semibold text-white">Links</span>
            <span>Analytics</span>
            <span>Settings</span>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/5 px-4 py-3 text-sm text-zinc-500">
            <Search size={16} />
            <span>Search...</span>
          </div>
          <button className="secondary-button h-12 w-12 px-0" type="button">
            <Bell size={16} />
          </button>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-sm font-semibold text-white">
            {user?.name?.slice(0, 2)?.toUpperCase() || "U"}
          </div>
          <button className="secondary-button gap-2" onClick={onLogout} disabled={loggingOut}>
            <LogOut size={16} />
            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-[24px] border border-brand-500/20 bg-brand-500/[0.08] px-4 py-3 text-sm text-brand-100">
        <Sparkles size={16} className="text-brand-300" />
        Your workspace is private by default. Every shortened URL and its analytics stay tied to your account.
      </div>
    </header>
  );
}

export default DashboardHeader;
