function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="panel grid-bg flex w-full max-w-md flex-col items-center gap-4 px-8 py-12 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-500/20 border-t-brand-400" />
        <p className="text-sm text-slate-300">{label}</p>
      </div>
    </div>
  );
}

export default Loader;
