function Loader({ label = "Loading..." }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="panel relative flex w-full max-w-md flex-col items-center gap-4 px-8 py-12 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white" />
        <p className="text-sm text-zinc-300">{label}</p>
      </div>
    </div>
  );
}

export default Loader;
