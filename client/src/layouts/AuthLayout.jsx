function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-950 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="relative hidden overflow-hidden border-r border-slate-800 lg:block">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
                Modern Link Intelligence
              </span>
            </div>
            <h2 className="max-w-xl text-5xl font-bold leading-tight text-white">
              Create clean short links and track engagement from one polished dashboard.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-slate-300">
              ShortIQ keeps your links organized, secure, and measurable with private workspaces
              for every account.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Fast redirects", value: "7-char codes" },
              { label: "Cookie auth", value: "JWT sessions" },
              { label: "Analytics", value: "Click tracking" },
            ].map((item) => (
              <div key={item.label} className="panel p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="grid-bg absolute inset-0 opacity-30 lg:hidden" />
        <div className="relative w-full">{children}</div>
      </section>
    </div>
  );
}

export default AuthLayout;
