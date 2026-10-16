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

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <main className="p-10 flex flex-col gap-4">
      <div className="width-full max-w-4xl p-2"></div>
      <div className="width-full max-w-4xl p-2"></div>
      <div className="width-full max-w-4xl p-2 flex flex-col gap-2">
        {urls.map((url) => {
          return (
            <div className="border border-neutral-200 p-2 gap-4 flex justify-evenly">
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
                <button className="p-2 rounded bg-orange-600 text-white cursor-pointer">
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
