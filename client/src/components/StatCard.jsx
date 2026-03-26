function StatCard({ label, value, helper }) {
  return (
    <div className="surface-muted p-5 sm:p-6">
      <p className="eyebrow">{label}</p>
      <p className="mt-4 text-4xl font-bold tracking-[-0.05em] text-white">{value}</p>
      <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">{helper}</p>
    </div>
  );
}

export default StatCard;
