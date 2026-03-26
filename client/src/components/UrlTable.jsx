import { Copy, ExternalLink, MousePointerClick } from "lucide-react";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function UrlTable({ urls, onCopy }) {
  if (!urls.length) {
    return (
      <div className="panel p-6 text-center">
        <h3 className="text-xl font-semibold text-white">No short links yet</h3>
        <p className="mt-2 text-sm text-slate-400">
          Create your first URL above and it will appear here with click analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-slate-800 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Your links</h2>
        <p className="mt-1 text-sm text-slate-400">
          Each row shows the original destination, short URL, click count, and creation date.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.3em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Original URL</th>
              <th className="px-6 py-4">Short URL</th>
              <th className="px-6 py-4">Clicks</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
            {urls.map((url) => (
              <tr key={url._id} className="hover:bg-slate-900/50">
                <td className="max-w-sm px-6 py-5">
                  <a
                    className="block truncate text-slate-200 hover:text-brand-300"
                    href={url.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    title={url.originalUrl}
                  >
                    {url.originalUrl}
                  </a>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <a
                      className="inline-flex items-center gap-2 text-brand-300 hover:text-brand-200"
                      href={url.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{url.shortUrl}</span>
                      <ExternalLink size={14} />
                    </a>
                    <button
                      className="rounded-xl border border-slate-700 p-2 text-slate-300 hover:border-slate-500 hover:text-white"
                      onClick={() => onCopy(url.shortUrl)}
                      type="button"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5">
                    <MousePointerClick size={14} className="text-brand-300" />
                    <span>{url.clicks}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-slate-400">{formatDate(url.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UrlTable;
