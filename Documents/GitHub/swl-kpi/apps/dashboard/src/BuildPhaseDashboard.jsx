import React from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts"

function Stat({ label, value, sub }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

function SemiGauge({ value, max = 24, label }) {
  const pct = Math.max(0, Math.min(1, value / max))
  const filled = Math.round(pct * 100)
  const data = [{ name: "filled", val: filled }, { name: "empty", val: 100 - filled }]
  return (
    <div>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label}</div>
      <div style={{ width: "100%", height: 160 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="val" startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} stroke="none">
              {data.map((_, i) => <Cell key={i} fill={i === 0 ? "#111827" : "#e5e7eb"} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ textAlign: "center", marginTop: -64 }}>
        <div style={{ fontSize: 28, fontWeight: 600 }}>{value}w</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>of {max}w target</div>
      </div>
    </div>
  )
}

export default function BuildPhaseDashboard({ api }) {
  const { summary, weeks, vendors, alignment } = api
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* KPI top row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <Stat label="Cash on Hand" value={`$${summary.cashOnHand.toLocaleString()}`} sub={`Weekly burn ≈ $${summary.weeklyBurn.toLocaleString()}`} />
        <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
          <SemiGauge value={summary.runwayWeeks} max={24} label="Runway (weeks)" />
        </div>
        <Stat label="Budget Variance" value={`${summary.budgetVariancePct.toFixed(1)}%`} sub="Actual vs Planned" />
        <Stat label="Contingency Used" value={`$${summary.contingencyUsed.toLocaleString()}`} sub={`${Math.round((summary.contingencyUsed/summary.contingency)*100)}% of $${summary.contingency.toLocaleString()}`} />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Budget vs Actual (Weekly)</div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={weeks} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="wk" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="planned" stroke="#94a3b8" strokeWidth={2} dot={false} name="Planned" />
                <Line type="monotone" dataKey="spend" stroke="#111827" strokeWidth={3} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Vendor Spend & Payment Lag</div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={vendors} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="spend" name="Spend ($)" fill="#111827" radius={[6,6,0,0]} />
                <Bar yAxisId="right" dataKey="lag" name="Lag (days)" fill="#94a3b8" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Alignment Backbone (VR · DE · QAA · FL · CRI)</div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <RadarChart data={alignment} outerRadius={90}>
                <PolarGrid />
                <PolarAngleAxis dataKey="kpi" />
                <PolarRadiusAxis angle={30} domain={[0, 1]} />
                <Radar name="Score" dataKey="score" stroke="#111827" fill="#111827" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Notes & Alerts</div>
          <ul style={{ fontSize: 14, lineHeight: 1.5 }}>
            <li>HVAC payment lag trending high (≥ 15 days). Consider partials or milestones.</li>
            <li>Week 4 overspend vs plan; validate change orders + approvals.</li>
            <li>Maintain runway ≥ 12 weeks while equipment orders clear.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
