function AuthForm({
  title,
  subtitle,
  fields,
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  submitLabel,
  footer,
}) {
  return (
    <div className="panel grid-bg w-full max-w-md p-8 sm:p-10">
      <div className="mb-8">
        <p className="mb-3 inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
          ShortIQ
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-sm text-slate-400">{subtitle}</p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              {field.label}
            </label>
            <input
              className="input-field"
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={onChange}
              autoComplete={field.autoComplete}
              required
            />
          </div>
        ))}

        {error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <button className="primary-button w-full" type="submit" disabled={loading}>
          {loading ? "Please wait..." : submitLabel}
        </button>
      </form>

      <div className="mt-6 text-sm text-slate-400">{footer}</div>
    </div>
  );
}

export default AuthForm;
