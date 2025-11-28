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
  { id: 1, name: "Alice", age: 30, sets: 3, reps: 10 },
  { id: 2, name: "Bob", age: 25, sets: 4, reps: 12 },
  { id: 3, name: "Charlie", age: 40, sets: 2, reps: 8 },
];

return (
  <div className={`app-container ${darkMode ? "dark" : "light"}`} style={{ display: "grid", gridTemplateColumns: "220px 1fr 350px", height: "100vh", gap: "20px" }}>
    <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} setCurrentView={setCurrentView} />

    {/* Middle Panel */}
    <div style={{ padding: "24px", overflowY: "auto" }}>
      {currentView === "default" && <div>Select "Patients" to view list</div>}

      {currentView === "patients" && !selectedPatient && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {patients.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPatient(p)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #aaa",
                backgroundColor: darkMode ? "#222" : "#fff",
                color: darkMode ? "#eee" : "#000",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              {p.name} ({p.age})
            </button>
          ))}
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
      <div style={{ borderLeft: "1px solid #aaa", padding: "24px" }}>
        <h2>Analytics for {selectedPatient.name}</h2>
        {/* You can plug in your ChartPanel, MetricCards, etc */}
      </div>
    )}
  </div>
);
}

export default App;
