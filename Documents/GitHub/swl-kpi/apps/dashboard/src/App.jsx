import React, { useEffect, useState } from "react"
import Dashboard from "./BuildPhaseDashboard.jsx"

export default function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/kpi/build")
      .then(r => r.json())
      .then(setData)
      .catch(() => setData(null))
  }, [])

  return (
    <div style={{ padding: 24 }}>
      {data ? <Dashboard api={data} /> : <div>Loading… (start the API on :8000)</div>}
    </div>
  )
}
