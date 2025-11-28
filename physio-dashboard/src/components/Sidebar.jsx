export default function Sidebar({ darkMode, setDarkMode, setCurrentView }) {
    return (
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px", background: darkMode ? "#111" : "#f8f9fa", color: darkMode ? "#eee" : "#000" }}>
        <h2>Physalign</h2>
        <button onClick={() => setCurrentView("default")}>Dashboard</button>
        <button onClick={() => setCurrentView("patients")}>Patients</button>
        <button onClick={() => setCurrentView("sessions")}>Sessions</button>
        <button onClick={() => setCurrentView("settings")}>Settings</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
        </button>
      </div>
    );
  }
  