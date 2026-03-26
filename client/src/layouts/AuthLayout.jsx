function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505]">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-full border border-white/10 bg-[#0f0f10]/90 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white" />
            <div>
              <p className="text-lg font-bold text-white">ShortIQ</p>
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Link Operating System</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400">
              Secure cookie sessions
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
              Private analytics
            </span>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <section className="px-2 pt-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
              <p className="eyebrow mb-6">Build, share, and track your links</p>
              <h1 className="hero-title text-[3.4rem] sm:text-[5rem] lg:max-w-5xl lg:text-[7.2rem]">
                Create, manage, and scale your short links with ShortIQ
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-zinc-400 lg:mx-0 lg:text-lg">
                A private workspace for marketing links, campaign redirects, and clean analytics.
                Built to feel sharp, calm, and useful from the first click.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <span className="secondary-button pointer-events-none">Fast redirects</span>
                <span className="secondary-button pointer-events-none">JWT auth</span>
                <span className="secondary-button pointer-events-none">Per-user dashboards</span>
              </div>
            </div>

            <div className="mt-14 overflow-hidden rounded-[32px] border border-white/10 bg-[#0c0c0d]/92 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-4 sm:px-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-white/15" />
                    <span className="text-sm text-zinc-300">Ridhima Kapoor</span>
                  </div>
                  <nav className="flex items-center gap-5 text-sm text-zinc-500">
                    <span>Overview</span>
                    <span className="font-semibold text-white">Links</span>
                    <span>Analytics</span>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-zinc-400">
                    Search links...
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    RK
                  </div>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
                <aside className="border-b border-white/[0.08] px-5 py-6 lg:border-b-0 lg:border-r">
                  <p className="eyebrow mb-4">Workspace</p>
                  <div className="space-y-2">
                    {["Overview", "Create Link", "Analytics", "Settings"].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-2xl px-4 py-3 text-sm ${
                          index === 1 ? "bg-white/[0.08] text-white" : "text-zinc-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="px-5 py-6 sm:px-8">
                  <h3 className="text-3xl font-bold tracking-tight text-white">Command your links</h3>
                  <p className="mt-2 max-w-xl text-zinc-500">
                    Launch short URLs, monitor click activity, and keep your entire redirect layer
                    under one clean interface.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {[
                      { label: "Active links", value: "128" },
                      { label: "Monthly clicks", value: "24.8K" },
                      { label: "Avg. CTR", value: "7.4%" },
                    ].map((item) => (
                      <div key={item.label} className="surface-muted p-5">
                        <p className="eyebrow">{item.label}</p>
                        <p className="mt-4 text-3xl font-bold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="surface-muted p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-lg font-semibold text-white">Recent link</p>
                        <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs text-brand-200">
                          Live
                        </span>
                      </div>
                      <div className="rounded-[20px] bg-black/30 p-4">
                        <p className="text-sm text-zinc-500">Original URL</p>
                        <p className="mt-2 truncate text-white">https://queryatlas.app/waitlist/campaign-2026</p>
                        <p className="mt-4 text-sm text-zinc-500">Short link</p>
                        <p className="mt-2 text-brand-300">shortiq.io/atlas26</p>
                      </div>
                    </div>
                    <div className="surface-muted p-5">
                      <p className="text-lg font-semibold text-white">Click pulse</p>
                      <div className="mt-6 flex h-40 items-end gap-3">
                        {[34, 56, 48, 72, 60, 88, 68, 96].map((height, index) => (
                          <div
                            key={height + index}
                            className="flex-1 rounded-t-[18px] bg-gradient-to-t from-brand-700 to-brand-400"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex items-start justify-center px-2 pb-6 lg:justify-end lg:px-0 lg:pt-16">
            <div className="w-full max-w-md">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
