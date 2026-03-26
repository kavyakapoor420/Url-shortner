import { LogOut } from "lucide-react";

function DashboardHeader({ user, onLogout, loggingOut }) {
  return (
    <header className="panel mb-8 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage your links, monitor clicks, and keep everything in one private workspace.
        </p>
      </div>

      <button className="secondary-button gap-2" onClick={onLogout} disabled={loggingOut}>
        <LogOut size={16} />
        {loggingOut ? "Signing out..." : "Logout"}
      </button>
    </header>
  );
}

export default DashboardHeader;
