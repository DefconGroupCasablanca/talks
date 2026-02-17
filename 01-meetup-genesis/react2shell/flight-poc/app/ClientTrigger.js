"use client";
import { useState, use, Suspense } from "react";
import { startLabTask } from "./actions"; // Updated import name

function ResultDisplay({ promise }) {
  const data = use(promise);
  return (
    <div className="bg-green-900/20 border border-green-500 p-4 mt-4 rounded">
      <p>Analysis: {data.analysis}</p>
      <p>Score: {data.complexityScore}</p>
    </div>
  );
}

export default function LabInterface() {
  const [task, setTask] = useState(null);

  return (
    <div className="space-y-6">
      <form action={async (formData) => {
        const res = await startLabTask(formData); // Updated function call
        setTask(res);
      }}>
        <input 
          name="labInput" 
          placeholder="Lab Data..." 
          className="bg-gray-800 p-2 rounded mr-2 text-white"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">
          Run Analysis
        </button>
      </form>

      {task && (
        <div className="p-4 border border-gray-700 rounded bg-gray-900 text-white">
          <p>Task ID: <span className="text-blue-400">{task.taskId}</span></p>
          <p>Status: {task.status}</p>
          
          <Suspense fallback={<p className="animate-pulse text-yellow-500 mt-4">Processing Background Flight Stream...</p>}>
            <ResultDisplay promise={task.resultPromise} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

