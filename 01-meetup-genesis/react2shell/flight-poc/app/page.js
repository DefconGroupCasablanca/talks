import FlightReferenceDemo from "./FlightReferenceDemo";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Pentinel Cloud</h1>
        <p className="text-slate-400">Enterprise Asset Monitoring</p>
      </header>

      <FlightReferenceDemo />

      <footer className="mt-12 opacity-30 hover:opacity-100 transition-opacity">
        <p className="text-slate-500 text-xs">Internal Security Researcher Build v2.0.4 - @asdf</p>
      </footer>
    </div>
  );
}
