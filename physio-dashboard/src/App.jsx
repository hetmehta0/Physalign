import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SessionOverview from "./components/SessionOverview";
import ChartPanel from "./components/ChartPanel";
import MetricCard from "./components/MetricCard";
import PressionOverview from "./components/PreSessionForm"


function App() {
const [darkMode, setDarkMode] = useState(false);
const [selectedPatient, setSelectedPatient] = useState(null); 
const [currentView, setCurrentView] = useState("overview");

const patients = [
  { id: 1, name: "Alice", age: 30, exercises: ["Squat", "Deadlift", "Push Up"] },
  { id: 2, name: "Bob", age: 25, exercises: ["Leg Raises", "Lateral Raise"] },
  { id: 3, name: "Charlie", age: 40, exercises: ["Squat", "Deadlift", "Wallsit"]},
];

return (
  <div className={`app-container ${darkMode ? "dark" : "light"}`} style={{ display: "grid", gridTemplateColumns: "220px 1fr 350px", height: "100vh", gap: "20px" }}>
    <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} setCurrentView={setCurrentView} />

    {/* Middle Panel */}
    <div style={{ padding: "50px", overflowY: "auto" }}>
      {currentView === "default" && <div>Select "Patients" to view list</div>}

      {currentView === "patients" && !selectedPatient && (
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            background: darkMode ? "#1a1a1a" : "#fff",
            padding: "24px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: darkMode 
              ? "0 4px 20px rgba(0,0,0,0.4)" 
              : "0 4px 20px rgba(0,0,0,0.12)"
          }}
        >
          {/* Header */}
          <h2 style={{ 
            margin: 0, 
            color: darkMode ? "#fff" : "#111" 
          }}>
            Patient List
          </h2>

          {/* Search Bar */}
          <input
            placeholder="Search patients…"
            style={{
              padding: "12px",
              borderRadius: "12px",
              border: darkMode ? "1px solid #444" : "1px solid #ddd",
              background: darkMode ? "#262626" : "#fafafa",
              color: darkMode ? "#fff" : "#111"
            }}
          />

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: darkMode ? "#333" : "#e6e6e6",
              margin: "8px 0"
            }}
          />

          {/* Patient List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {patients.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  border: darkMode ? "1px solid #333" : "1px solid #ccc",
                  background: darkMode ? "#222" : "#fff",
                  color: darkMode ? "#eee" : "#000",
                  transition: "0.2s",
                  boxShadow: darkMode 
                    ? "0 3px 12px rgba(0,0,0,0.3)" 
                    : "0 3px 12px rgba(0,0,0,0.08)"
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: darkMode ? "#333" : "#dedede",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  {p.name[0]}
                </div>

                {/* Patient Info */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>{p.name}</span>
                  <span style={{ opacity: 0.7 }}>Age: {p.age}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPatient && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3>{selectedPatient.name}'s Info</h3>
          <p>Age: {selectedPatient.age}</p>
          <p>Sets: {selectedPatient.sets}</p>
          <p>Reps: {selectedPatient.reps}</p>
          <textarea placeholder="Add notes..." style={{ width: "100%", minHeight: "80px" }}></textarea>
          <button onClick={() => setSelectedPatient(null)}>Back to patient list</button>
        </div>
      )}
    </div>

    {/* Right Panel can show analytics for selectedPatient */}
    {selectedPatient && (
      <div style={{ borderLeft: "1px solid #aaa", padding: "10px" }}>
        <h2>Analytics for {selectedPatient.name}</h2>
        {/* You can plug in your ChartPanel, MetricCards, etc */}
      </div>
    )}
  </div>
);
}

export default App;
