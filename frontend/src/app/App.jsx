import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const dummyUrls = [
   
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
    <main className="min-h-screen bg-orange-50/40 text-neutral-900">
      {/* Navbar */}
      <header className="border-b border-neutral-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-white">
              L
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Link<span className="text-orange-500">zip</span>
            </span>
          </div>

          <span className="hidden text-sm text-neutral-500 sm:block">
            Simple links. Smarter sharing.
          </span>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium transition hover:border-orange-400 hover:text-orange-600"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      {/* Hero and URL form */}
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700">
            Fast · Simple · Reliable
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Shorten links.
            <br />
            <span className="text-orange-500">Share more.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
            Turn long URLs into clean, shareable links in seconds. Simple, fast,
            and ready to go wherever you do.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl shadow-orange-900/5 sm:p-8">
          <label
            htmlFor="long-url"
            className="mb-3 block text-sm font-semibold text-neutral-800"
          >
            Paste your long URL
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="long-url"
              className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              placeholder="https://example.com/your/very/long/url"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button
              onClick={createShortUrl}
              className="rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.98]"
            >
              Shorten link →
            </button>
          </div>

          <p className="mt-3 text-xs text-neutral-400">
            Paste a URL above to create your short link.
          </p>
        </div>

        {/* Generated short link */}
        {currentValue && (
          <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-orange-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold text-neutral-800">
              Your shortened URL is ready!
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`http://localhost:3000/${currentValue.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex-1 break-all rounded-xl bg-orange-50 p-3.5 font-semibold text-orange-600 transition hover:text-orange-700"
              >
                {`http://localhost:3000/${currentValue.shortCode}`}
              </a>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://localhost:3000/${currentValue.shortCode}`,
                  )
                }
                className="rounded-xl border border-orange-200 px-5 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                Copy link
              </button>
            </div>
          </div>
        )}
      </section>

      {/* URL history */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-5">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Your recent links
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Keep track of your shortened URLs in one place.
            </p>
          </div>

          <span className="w-fit rounded-full bg-white px-3 py-1.5 text-sm text-neutral-500 ring-1 ring-neutral-200">
            {urls.length} links
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {/* Table headings */}
          <div className="hidden grid-cols-12 gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 md:grid">
            <div className="col-span-3">Short link</div>
            <div className="col-span-5">Original URL</div>
            <div className="col-span-1 text-center">Clicks</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {urls.map((url) => (
            <div
              key={url._id}
              className="grid grid-cols-1 gap-3 border-b border-neutral-100 p-5 last:border-b-0 hover:bg-orange-50/30 sm:p-6 md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="min-w-0 md:col-span-3">
                <p className="mb-1 text-xs font-medium text-neutral-400 md:hidden">
                  SHORT LINK
                </p>
                <a
                  href={`http://localhost:3000/${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                >
                  {url.shortCode} ↗
                </a>
              </div>

              <div className="min-w-0 md:col-span-5">
                <p className="mb-1 text-xs font-medium text-neutral-400 md:hidden">
                  ORIGINAL URL
                </p>
                <p
                  title={url.originalUrl}
                  className="truncate text-sm text-neutral-500"
                >
                  {url.originalUrl}
                </p>
              </div>

              <div className="flex items-center justify-between md:col-span-1 md:justify-center">
                <p className="text-xs font-medium text-neutral-400 md:hidden">
                  CLICKS
                </p>
                <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700">
                  {url.clicks}
                </span>
              </div>

              <div className="flex gap-2 md:col-span-3 md:justify-end">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `http://localhost:3000/${url.shortCode}`,
                    )
                  }
                  className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 md:flex-none"
                >
                  Copy
                </button>

                <button
                  onClick={() => deleteUrl(url._id)}
                  className="flex-1 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 md:flex-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {urls.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="font-semibold text-neutral-700">No links yet</p>
              <p className="mt-1 text-sm text-neutral-500">
                Your shortened links will appear here.
              </p>
            </div>
          )}
        </div>

        <footer className="py-8 text-center text-sm text-neutral-400">
          Made with care by Linkzip
        </footer>
      </section>
    </main>
  );
}

export default App;
