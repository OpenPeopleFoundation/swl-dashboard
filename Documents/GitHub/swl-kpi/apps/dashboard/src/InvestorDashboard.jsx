import React, { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function InvestorDashboard() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const DEFAULT_SHEET = import.meta.env.VITE_SHEET_ID || "";
  const params = new URLSearchParams(window.location.search);
  const SHEET_ID = params.get("sheet_id") || DEFAULT_SHEET;

  const [data, setData] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [err, setErr] = useState(null);

  const fetchData = () => {
    <div style={{fontSize:12,color:"#6b7280"}}>
        Debug → API: {API} · SHEET_ID: {SHEET_ID || "(none)"} 
    </div>
    if (!SHEET_ID) { setErr("Missing sheet_id (env VITE_SHEET_ID or ?sheet_id=)"); return; }
    const url = `${API}/kpi/sheets?sheet_id=${encodeURIComponent(SHEET_ID)}&weeks_sheet=weeks&vendors_sheet=vendors&t=${Date.now()}`;
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`${r.status} ${r.statusText}`); return r.json(); })
      .then(json => { setData(json); setUpdatedAt(new Date()); setErr(null); })
      .catch(e => setErr(e.message));

  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(id);
  }, []);

  if (err) return <div style={{ padding: 24, color: "#b91c1c" }}>Error: {err}</div>;
  if (!data) return <div style={{ padding: 24 }}>Loading latest metrics…</div>;

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 style={{ margin: 0 }}>Snow White Laundry — Investor Dashboard</h1>
        <small style={{ color: "#6b7280" }}>
          Last updated: {updatedAt ? updatedAt.toLocaleTimeString() : "—"}
        </small>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        <Stat label="Cash on Hand" value={`$${data.summary.cashOnHand.toLocaleString()}`} />
        <Stat label="Runway (weeks)" value={data.summary.runwayWeeks} />
        <Stat label="Budget Variance" value={`${data.summary.budgetVariancePct.toFixed(1)}%`} />
      </div>

      <Card title="Weekly Spend vs Plan" height={320} style={{ marginTop: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.weeks} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="wk" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="planned" name="Planned" stroke="#94a3b8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="spend" name="Actual" stroke="#111827" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ marginTop: 12, color: "#6b7280", fontSize: 12 }}>
        * For investor transparency. Figures are unaudited and subject to change.
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function Card({ title, children, height = 300, style }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, ...style }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}
