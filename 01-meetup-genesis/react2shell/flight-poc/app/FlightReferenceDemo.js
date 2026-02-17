"use client";
import { useState } from "react";
import { runDiagnostic } from "./actions"; // Renamed for clarity

export default function FlightReferenceDemo() {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunDiagnostic = async () => {
    setIsRunning(true);
    
    // Create a new log entry placeholder
    const timestamp = new Date().toLocaleTimeString();
    
    // 1. Relatable Data: User Info & System Stats
    const systemInfo = {
      os: "Linux (Ubuntu 22.04)",
      node: "Worker-01",
      uptime: "48h 12m"
    };

    const userInfo = {
      username: "admin_user",
      role: "SuperAdmin"
    };

    // 2. The "Slow" Operation (Simulated Network Check)
    // This is the PROMISE ($@) reference!
    const networkCheck = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          latency: "24ms",
          packetLoss: "0%",
          status: "Healthy"
        });
      }, 2000); // 2-second delay
    });

    try {
      // Send the complex object to the server
      const result = await runDiagnostic({
        id: "DIAG-" + Math.floor(Math.random() * 1000),
        system: systemInfo,
        user: userInfo,
        networkStatus: networkCheck // The deferred part
      });

      // 3. Insert the Server's Response into the UI
      setLogs((prev) => [result, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 text-slate-200 rounded-lg shadow-xl font-mono">
      
      {/* Header Area */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-400">System Diagnostic Tool</h2>
          <p className="text-xs text-slate-500">v2.4.0-stable</p>
        </div>
        <button
          onClick={handleRunDiagnostic}
          disabled={isRunning}
          className={`px-4 py-2 rounded text-sm font-bold transition-all ${
            isRunning 
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50"
          }`}
        >
          {isRunning ? "RUNNING TESTS..." : "RUN DIAGNOSTIC"}
        </button>
      </div>

      {/* The Server Response Area */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Server Logs</h3>
        
        {logs.length === 0 && (
          <div className="text-center py-8 text-slate-600 italic border border-dashed border-slate-800 rounded">
            No diagnostics run yet. Click the button above.
          </div>
        )}

        {logs.map((log, index) => (
          <div key={index} className="bg-slate-950 border-l-4 border-emerald-500 p-4 rounded shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-emerald-400 font-bold text-sm">✓ {log.message}</span>
                <div className="text-xs text-slate-500 mt-1">ID: {log.id}</div>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{log.timestamp}</span>
            </div>
            
            {/* Displaying returned data */}
            <div className="mt-3 grid grid-cols-2 gap-4 text-xs bg-slate-900/50 p-2 rounded">
              <div>
                <span className="text-slate-500 block">Latency</span>
                <span className="text-white">{log.stats.latency}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Packet Loss</span>
                <span className="text-white">{log.stats.packetLoss}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
