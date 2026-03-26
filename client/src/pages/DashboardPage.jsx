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
    <div className="min-h-screen">
      <div className="grid-bg fixed inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <DashboardHeader user={user} onLogout={handleLogout} loggingOut={logoutLoading} />

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>

        <div className="mb-8">
          <CreateUrlForm
            value={urlInput}
            onChange={setUrlInput}
            onSubmit={handleCreate}
            loading={createLoading}
            error={createError}
          />
        </div>

        {pageLoading ? (
          <div className="panel p-8 text-center text-slate-300">Loading your URLs...</div>
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
