import { useState } from "react";
import { testCohereAPI, chatWithCohere, CohereMessage } from "../lib/cohere";
import { env } from "../lib/env";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ApiTest = () => {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState(
    "Hello, can you explain what machine learning is?"
  );

  const runTest = async () => {
    setTestStatus("loading");
    try {
      const result = await testCohereAPI();
      setTestResult(result ? "API test successful!" : "API test failed.");
      setTestStatus(result ? "success" : "error");
    } catch (error) {
      setTestResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
      setTestStatus("error");
    }
  };

  const sendTestMessage = async () => {
    setApiResponse(null);
    setTestStatus("loading");
    try {
      const messages: CohereMessage[] = [
        { role: "USER", message: testMessage },
      ];
      const response = await chatWithCohere(messages);
      setApiResponse(response);
      setTestStatus("success");
    } catch (error) {
      setApiResponse(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
      setTestStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Cohere API Test
              </h1>
              <p className="text-xl text-muted-foreground">
                Test if the Cohere AI API is working correctly.
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Environment Variables
              </h2>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">API URL: </span>
                  <span className="text-white">{env.API_URL}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">API Key: </span>
                  <span className="text-white">
                    {env.COHERE_API_KEY
                      ? `${env.COHERE_API_KEY.substring(
                          0,
                          5
                        )}...${env.COHERE_API_KEY.substring(
                          env.COHERE_API_KEY.length - 4
                        )}`
                      : "Not set"}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Simple API Test
              </h2>
              <button
                className="px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/90 transition-colors"
                onClick={runTest}
                disabled={testStatus === "loading"}
              >
                {testStatus === "loading" ? "Testing..." : "Run Test"}
              </button>

              {testResult && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    testStatus === "success"
                      ? "bg-green-500/20"
                      : "bg-red-500/20"
                  }`}
                >
                  <p className="text-white">{testResult}</p>
                </div>
              )}
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Test with Custom Message
              </h2>
              <div className="mb-4">
                <label className="block text-muted-foreground mb-2">
                  Test Message:
                </label>
                <textarea
                  className="w-full bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  rows={3}
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                />
              </div>

              <button
                className="px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/90 transition-colors"
                onClick={sendTestMessage}
                disabled={testStatus === "loading" || !testMessage.trim()}
              >
                {testStatus === "loading" ? "Sending..." : "Send Test Message"}
              </button>

              {apiResponse && (
                <div className="mt-4 p-4 rounded-lg bg-accent/40">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Response:
                  </h3>
                  <p className="text-white whitespace-pre-wrap">
                    {apiResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiTest;
