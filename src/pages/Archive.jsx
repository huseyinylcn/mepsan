import React from "react";

import { fetchArchiveItems } from "../api/archiveApi";

export default function Archive() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArchiveItems();
        if (!isMounted) return;
        const nextItems = Array.isArray(data) ? data : [];
        setItems(nextItems);
        setSelectedIndex(nextItems.length > 0 ? 0 : -1);
      } catch (e) {
        if (!isMounted) return;
        setError(e);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedItem = selectedIndex >= 0 ? items[selectedIndex] : null;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Archive</h1>

      {loading && <div className="mt-4">Loading...</div>}

      {error && (
        <div className="mt-4 text-red-600">
          Error: {error?.message || "Request failed"}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-4 rounded-md border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800">
              Files
            </div>

            <div className="max-h-[70vh] overflow-auto p-2">
              {items.length === 0 ? (
                <div className="px-2 py-3 text-sm text-slate-500">No data</div>
              ) : (
                <div className="space-y-1">
                  {items.map((x, idx) => (
                    <button
                      key={`${x?.name ?? "item"}-${idx}`}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={
                        idx === selectedIndex
                          ? "w-full rounded-md bg-indigo-50 px-3 py-2 text-left text-sm font-semibold text-indigo-700"
                          : "w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                      }
                    >
                      {x?.name ?? "(no name)"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-8 rounded-md border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800">
              {selectedItem?.name ?? "Content"}
            </div>

            <div className="p-3">
              {!selectedItem ? (
                <div className="text-sm text-slate-500">Select a file</div>
              ) : (
                <pre className="whitespace-pre-wrap break-words text-sm text-slate-800">
                  {selectedItem.content ?? ""}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
