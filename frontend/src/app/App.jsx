import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const dummyUrls = [
    {
      _id: "1",
      originalUrl:
        "https://www.amazon.in/Apple-2026-MacBook-Laptop-chip/dp/B0GR64G4H6/ref=zg_bs_g_1375424031_d_sccl_1/524-1196745-3006266",
      shortCode: "AK2820",
      clicks: 9,
    },
    {
      _id: "2",
      originalUrl:
        "https://www.amazon.in/Apple-2026-MacBook-Laptop-chip/dp/B0GR64G4H6/ref=zg_bs_g_1375424031_d_sccl_1/524-1196745-3006266",
      shortCode: "AK2820",
      clicks: 4,
    },
    {
      _id: "3",
      originalUrl:
        "https://www.amazon.in/Apple-2026-MacBook-Laptop-chip/dp/B0GR64G4H6/ref=zg_bs_g_1375424031_d_sccl_1/524-1196745-3006266",
      shortCode: "AK2820",
      clicks: 5,
    },
  ];

  const [urls, setUrls] = useState(dummyUrls);
  const [inputValue, setInputValue] = useState("");
  const [currentValue, setCurrentValue] = useState(null);

  async function fetchUrls() {
    const response = await axios.get("/api/url");

    const responseData = response.data;

    console.log(responseData.data.urls);

    setUrls(responseData.data.urls);
  }

  async function createShortUrl() {
    const response = await axios.post("http://localhost:5173/api/url", {
      url: inputValue,
    });

    setCurrentValue({
      originalUrl: response.data.data.originalUrl,
      shortCode: response.data.data.shortCode,
    });
    fetchUrls();
  }

  async function deleteUrl(id) {
    await axios.delete(`http://localhost:5173/api/url/${id}`);

    fetchUrls();
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <main className="p-10 flex flex-col gap-4">
      <div className="width-full max-w-4xl p-2 flex gap-2">
        <input
          className="border rounded w-full p-2 "
          placeholder="Enter Long URL"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="rounded p-2 bg-orange-600 text-white cursor-pointer"
          onClick={createShortUrl}
        >
          Shorten
        </button>
      </div>
      <div className="w-full max-w-4xl p-4 border rounded-lg">
        {currentValue && (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-green-600">
              Your shortened URL is ready!
            </p>

            <div className="flex items-center gap-2">
              <a
                href={`http://localhost:3000/${currentValue.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {`http://localhost:3000/${currentValue.shortCode}`}
              </a>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://localhost:3000/${currentValue.shortCode}`,
                  )
                }
                className="rounded p-2 bg-orange-600 text-white cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="width-full max-w-4xl p-2 flex flex-col gap-2">
        {urls.map((url) => {
          return (
            <div className="border border-neutral-200 p-2 gap-4 flex justify-between">
              <a
                href={`http://localhost:3000/${url.shortCode}`}
                target="_blank"
              >
                {url.shortCode}
              </a>
              <p className="truncate">{url.originalUrl}</p>

              <div className="flex gap-2">
                <button className="p-2 rounded bg-orange-600 text-white cursor-pointer">
                  Copy
                </button>
                <button
                  onClick={() => deleteUrl(url._id)}
                  className="p-2 rounded bg-orange-600 text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
