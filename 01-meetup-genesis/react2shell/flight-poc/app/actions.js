"use server";

export async function runDiagnostic(payload) {
  // 1. Access the immediate data
  const user = payload.user.username;
  const sys = payload.system.node;
  
  console.log(`[Server] Starting diagnostic for ${user} on ${sys}...`);

  // 2. Wait for the client's promise to resolve ($@ reference)
  // The server effectively "pauses" here until the client sends the data
  const networkData = await payload.networkStatus;

  console.log(`[Server] Network check complete: ${networkData.status}`);

  // 3. Return a structured object for the UI
  return {
    id: payload.id,
    timestamp: new Date().toLocaleTimeString(),
    message: `Diagnostic Completed for ${sys}`,
    stats: {
      latency: networkData.latency,      // Echoed back from the promise
      packetLoss: networkData.packetLoss // Echoed back from the promise
    }
  };
}
