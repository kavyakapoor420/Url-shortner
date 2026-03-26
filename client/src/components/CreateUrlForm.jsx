import { Link2 } from "lucide-react";

function CreateUrlForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <div className="panel p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">
            Create Link
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Shorten a new URL</h2>
        </div>
        <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-3 text-brand-200">
          <Link2 size={22} />
        </div>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Long URL</label>
          <input
            className="input-field"
            type="text"
            placeholder="https://example.com/your-very-long-link"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <button className="primary-button w-full sm:w-auto" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Generate Short URL"}
        </button>
      </form>
    </div>
  );
}

export default CreateUrlForm;
