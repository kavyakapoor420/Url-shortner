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
      <div className="panel p-8 text-center">
        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">No short links yet</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Create your first URL above and it will appear here with click analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-col gap-2 border-b border-white/[0.08] px-6 py-5">
        <p className="eyebrow">Link Inventory</p>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">Your links</h2>
        <p className="text-sm leading-6 text-zinc-500">
          Each row shows the original destination, short URL, click count, and creation date.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/[0.08] text-left">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.3em] text-zinc-500">
            <tr>
              <th className="px-6 py-4">Original URL</th>
              <th className="px-6 py-4">Short URL</th>
              <th className="px-6 py-4">Clicks</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.08] text-sm text-zinc-300">
            {urls.map((url) => (
              <tr key={url._id} className="hover:bg-white/[0.02]">
                <td className="max-w-sm px-6 py-5">
                  <a
                    className="block truncate text-zinc-200 hover:text-white"
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
                      className="rounded-2xl border border-white/10 p-2 text-zinc-300 hover:border-white/20 hover:text-white"
                      onClick={() => onCopy(url.shortUrl)}
                      type="button"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                    <MousePointerClick size={14} className="text-brand-300" />
                    <span>{url.clicks}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-zinc-500">{formatDate(url.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UrlTable;
