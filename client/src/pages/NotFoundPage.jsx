import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="panel grid-bg w-full max-w-xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">404</p>
        <h1 className="mt-4 text-4xl font-bold text-white">Page not found</h1>
        <p className="mt-4 text-slate-400">
          The page you were looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link className="primary-button mt-8" to="/dashboard">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
