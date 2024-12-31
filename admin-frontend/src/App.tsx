import { useState } from "react";
import { Loader2 } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const createData = async () => {
    setLoading(true);
    setError("");
    setPost("");

    try {
      const response = await fetch(`http://localhost:3001/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setPost(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Admin - Socket Architecture
          </h1>
          <button
            disabled
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md
                     transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed
                     flex items-center justify-center min-w-[140px]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Loading...
              </>
            ) : (
              "None"
            )}
          </button>
          <br />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            placeholder="Enter data value..."
          />
          <button
            onClick={createData}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md
                     transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed
                     flex items-center justify-center min-w-[140px]"
          >
            Create Data
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}
          {post && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-600">{post}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
