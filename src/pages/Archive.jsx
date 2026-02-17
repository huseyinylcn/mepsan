import React from "react";

import { fetchArchiveItems } from "../api/archiveApi";

export default function Archive() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArchiveItems();
        if (!isMounted) return;
        setItems(data);
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
        <div className="mt-4 space-y-2">
          {items.slice(0, 10).map((x) => (
            <div key={x.id} className="rounded-md border border-slate-200 bg-white p-3">
              <div className="text-sm font-semibold text-slate-900">{x.title}</div>
              <div className="mt-1 text-sm text-slate-600">{x.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
