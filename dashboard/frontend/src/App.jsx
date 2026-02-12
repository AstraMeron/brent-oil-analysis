import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ReferenceLine
} from "recharts";

function App() {
  const [historical, setHistorical] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [highlightDate, setHighlightDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hist, anal] = await Promise.all([
          axios.get("http://127.0.0.1:5000/api/historical"),
          axios.get("http://127.0.0.1:5000/api/analysis")
        ]);
        // Sort here just in case the backend forgot
        const sorted = hist.data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        setHistorical(sorted);
        setAnalysis(anal.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const majorEvents = [
    { date: "1990-08-02", label: "Gulf War" },
    { date: "2008-07-03", label: "2008 Peak" },
    { date: "2014-06-20", label: "Shale Glut" },
    { date: "2020-04-20", label: "COVID Crash" }
  ];

  if (loading) return <div>Loading Analysis...</div>;

  return (
    <div style={{ padding: "40px", background: "#f1f5f9", minHeight: "100vh" }}>
      <h1>Brent Oil Dashboard</h1>
      
      {/* Metrics Section */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <Metric label="Break Date" value={analysis?.change_point} />
        <Metric label="Pre-Mean" value={`$${analysis?.pre_mean}`} />
        <Metric label="Post-Mean" value={`$${analysis?.post_mean}`} />
      </div>

      {/* Interaction Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {majorEvents.map(e => (
          <button 
            key={e.date} 
            onClick={() => setHighlightDate(e.date)}
            style={{ marginRight: "10px", padding: "8px 15px", cursor: "pointer", background: highlightDate === e.date ? "#2563eb" : "#fff", color: highlightDate === e.date ? "#fff" : "#000" }}
          >
            {e.label}
          </button>
        ))}
        <button onClick={() => setHighlightDate(null)}>Clear</button>
      </div>

      {/* Fixed Dimension Chart Container */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", height: "500px", border: "1px solid #e2e8f0" }}>
        <LineChart width={1100} height={450} data={historical}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="Date" tickFormatter={d => d.split('-')[0]} interval={500} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Price" stroke="#2563eb" dot={false} strokeWidth={2} isAnimationActive={false} />
          
          {/* Static Break Line */}
          <ReferenceLine x="2005-02-02" stroke="red" label="2005 Shift" />
          
          {/* Dynamic Event Line */}
          {highlightDate && (
            <ReferenceLine x={highlightDate} stroke="orange" strokeWidth={3} strokeDasharray="5 5" label="Event" />
          )}
        </LineChart>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "8px", textAlign: "center", border: "1px solid #e2e8f0" }}>
      <div style={{ color: "#64748b", fontSize: "14px" }}>{label}</div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>{value || "N/A"}</div>
    </div>
  );
}

export default App;