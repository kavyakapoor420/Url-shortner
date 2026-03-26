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
    <div className="panel relative w-full overflow-hidden p-7 sm:p-8">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%)]" />
      <div className="relative">
        <div className="mb-8">
          <p className="eyebrow mb-4">Account Access</p>
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-[2.2rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{subtitle}</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
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
            <div className="rounded-[22px] border border-rose-500/20 bg-rose-500/[0.08] px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <button className="primary-button mt-3 w-full" type="submit" disabled={loading}>
            {loading ? "Please wait..." : submitLabel}
          </button>
        </form>

        <div className="mt-5 border-t border-white/[0.08] pt-5 text-sm text-zinc-400">{footer}</div>
      </div>
    </div>
  );
}

export default AuthForm;
