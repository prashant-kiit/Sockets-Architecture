import { useState } from "react";
import { Loader2 } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [curentPoll, setCurrentPoll] = useState<number>(0);

  const fetchAPI = async () => {
    setLoading(true);
    setError("");
    setPost("");

    try {
      const response = await fetch(`http://localhost:3001/api/` + inputValue);

      console.log(response);

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

  const fetchShortPoll = async () => {
    setLoading(true);
    setError("");
    setPost("");

    clearInterval(curentPoll);

    const newPoll = setInterval(async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/short-poll/` + inputValue
        );

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
    }, 2000);

    setCurrentPoll(newPoll);
  };

  const fetchLongPoll = async () => {
    setLoading(true);
    setError("");
    setPost("");

    try {
      const response = await fetch(
        `http://localhost:3001/long-poll/` + inputValue
      );

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

  const fetchBigCompute = async () => {
    setLoading(true);
    setError("");
    setPost("");

    try {
      const response = await fetch(`http://localhost:3001/do-big-compute/`);

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
            User - Socket Architecture
          </h1>
          <button
            disabled
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md
                     transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed
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
          <br />
          <button
            onClick={fetchAPI}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md
                     transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed
                     flex items-center justify-center min-w-[140px]"
          >
            Request API
          </button>
          <br />
          <button
            onClick={fetchShortPoll}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md
                     transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed
                     flex items-center justify-center min-w-[140px]"
          >
            Request Short Poll
          </button>
          <br />
          <button
            onClick={fetchLongPoll}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md
                     transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed
                     flex items-center justify-center min-w-[140px]"
          >
            Request Long Poll
          </button>
          <br />
          <button
            onClick={fetchBigCompute}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md
                     transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed
                     flex items-center justify-center min-w-[140px]"
          >
            Request Web Hook
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
