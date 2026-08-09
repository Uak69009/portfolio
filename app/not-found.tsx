import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-24 text-slate-900">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto mb-6 text-indigo-600">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-6xl font-extrabold mb-2 text-slate-950 tracking-tight" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
          404
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Page Not Found</h2>
        <p className="text-slate-600 mb-8 leading-relaxed text-sm">
          The page you are looking for doesn&apos;t exist or has been moved. Return to the portfolio homepage of Umair Amjad Khan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
