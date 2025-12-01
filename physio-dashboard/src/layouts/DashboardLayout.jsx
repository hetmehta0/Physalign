import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ darkMode, setDarkMode, rightPanel, children }) {
  return (
    <div
      className={`app-container ${darkMode ? "dark" : "light"}`}
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr 350px",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div style={{ padding: "50px", overflowY: "auto" }}>
        {children}
      </div>

      <div style={{ borderLeft: "1px solid #aaa", padding: "10px" }}>
        {rightPanel}
      </div>
    </div>
  );
}
