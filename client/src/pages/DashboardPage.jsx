import { useEffect, useState } from "react";
import { fetchMyUrls, createShortUrl as createShortUrlRequest } from "../api/urlApi";
import CreateUrlForm from "../components/CreateUrlForm";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import UrlTable from "../components/UrlTable";
import useAuth from "../hooks/useAuth";

function DashboardPage() {
  const { user, logout } = useAuth();
  const [urlInput, setUrlInput] = useState("");
  const [urls, setUrls] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    const loadUrls = async () => {
      try {
        setFetchError("");
        const response = await fetchMyUrls();
        setUrls(response.urls);
      } catch (apiError) {
        setFetchError(apiError.response?.data?.message || "Unable to load your URLs");
      } finally {
        setPageLoading(false);
      }
    };

    loadUrls();
  }, []);

  const totalClicks = urls.reduce((sum, item) => sum + item.clicks, 0);
  const stats = [
    {
      label: "Total URLs",
      value: urls.length,
      helper: "Private links created in your account",
    },
    {
      label: "Total Clicks",
      value: totalClicks,
      helper: "Combined visits across all short links",
    },
    {
      label: "Latest Link",
      value: urls[0] ? new URL(urls[0].originalUrl).hostname : "--",
      helper: "Most recently created destination",
    },
  ];

  const handleCreate = async (event) => {
    event.preventDefault();
    setCreateError("");
    setCreateLoading(true);

    try {
      const response = await createShortUrlRequest({ originalUrl: urlInput });
      setUrls((current) => [response.url, ...current]);
      setUrlInput("");
    } catch (apiError) {
      setCreateError(apiError.response?.data?.message || "Unable to create your short URL");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505]">
      <div className="grid-bg fixed inset-0 opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <DashboardHeader user={user} onLogout={handleLogout} loggingOut={logoutLoading} />

        <section className="mb-10 px-1 py-8 text-center lg:px-10">
          <p className="eyebrow">Short links, done beautifully</p>
          <h2 className="hero-title mx-auto mt-5 max-w-5xl text-[3rem] sm:text-[4.8rem] lg:text-[6.2rem]">
            Build, organize, and track every link from one sharp workspace
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
            Your dashboard keeps link creation, click metrics, and clean redirects in one place
            without the clutter of an overdesigned admin panel.
          </p>
        </section>

        <div className="mb-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <CreateUrlForm
            value={urlInput}
            onChange={setUrlInput}
            onSubmit={handleCreate}
            loading={createLoading}
            error={createError}
          />

          <div className="panel p-6 sm:p-7">
            <p className="eyebrow">Workspace Snapshot</p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-white">
              See how your links are performing
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-500">
              Watch your private link inventory grow with clear counts, clean copy actions, and
              just enough analytics to stay useful.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <StatCard key={item.label} {...item} />
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-[#111214] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-white">Click pulse</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                  Last 8 links
                </span>
              </div>
              <div className="flex h-40 items-end gap-3">
                {(urls.length ? urls.slice(0, 8).map((item) => item.clicks + 12) : [18, 30, 22, 42, 35, 56, 40, 64]).map(
                  (value, index) => (
                    <div
                      key={value + index}
                      className="flex-1 rounded-t-[18px] bg-gradient-to-t from-brand-800 via-brand-600 to-brand-400"
                      style={{ height: `${Math.max(18, Math.min(100, value))}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {pageLoading ? (
          <div className="panel p-8 text-center text-zinc-300">Loading your URLs...</div>
        ) : fetchError ? (
          <div className="panel border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200">
            {fetchError}
          </div>
        ) : (
          <UrlTable urls={urls} onCopy={handleCopy} />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
