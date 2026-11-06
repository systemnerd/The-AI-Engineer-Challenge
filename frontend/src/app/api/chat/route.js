/**
 * POST /api/chat
 *
 * Forwards a chat message from the browser to the FastAPI backend in /api.
 * Going through this handler keeps the backend address on the server and lets
 * us turn backend failures into messages that are safe to show in the UI.
 */

// gpt-5 can take a while on long replies, so allow plenty of time before giving up.
const BACKEND_TIMEOUT_MS = 120_000;

function errorResponse(message, status) {
  return Response.json({ error: message }, { status });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return errorResponse("Please enter a message.", 400);
  }

  // Read per request so the deployment's value is used, with a local default.
  const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

  let backendResponse;
  try {
    backendResponse = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      return errorResponse("The coach took too long to reply. Please try again.", 504);
    }
    console.error("Could not reach the backend:", error);
    return errorResponse("Can't reach the backend. Is the API server running?", 502);
  }

  if (!backendResponse.ok) {
    // The backend's error text can include OpenAI details, so log it here
    // rather than sending it to the browser.
    console.error(
      `Backend returned ${backendResponse.status}:`,
      await backendResponse.text().catch(() => "")
    );
    return errorResponse("The coach couldn't reply just now. Please try again.", 502);
  }

  const data = await backendResponse.json().catch(() => null);
  if (typeof data?.reply !== "string") {
    return errorResponse("The coach sent back an empty reply. Please try again.", 502);
  }

  return Response.json({ reply: data.reply });
}
