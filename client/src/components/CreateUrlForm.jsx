import { Link2 } from "lucide-react";

function CreateUrlForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <div className="panel p-6 sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Create Link</p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-white">
            Shorten a new URL
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Paste a long destination and generate a compact link that feels ready for campaigns,
            portfolios, and product launches.
          </p>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-white/5 p-3 text-brand-200">
          <Link2 size={22} />
        </div>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="rounded-[28px] border border-white/10 bg-[#111214] p-3 sm:p-4">
          <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Long URL
          </label>
          <div className="flex flex-col gap-3 lg:flex-row">
            <input
              className="input-field flex-1"
              type="text"
              placeholder="https://example.com/your-very-long-link"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              required
            />
            <button className="primary-button min-w-[190px]" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Generate Short URL"}
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-[22px] border border-rose-500/20 bg-rose-500/[0.08] px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default CreateUrlForm;
