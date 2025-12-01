import { useNavigate } from "react-router-dom";

export default function PatientList({ patients, darkMode }) {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "100%",
      maxWidth: "700px",
      margin: "0 auto",
      background: darkMode ? "#1a1a1a" : "#fff",
      padding: "24px",
      borderRadius: "16px",
      boxShadow: darkMode
        ? "0 4px 20px rgba(0,0,0,0.4)"
        : "0 4px 20px rgba(0,0,0,0.12)"
    }}>
      <h2 style={{ margin: 0 }}>Patient List</h2>

      <input
        placeholder="Search patients…"
        style={{
          padding: "12px",
          borderRadius: "12px",
          border: darkMode ? "1px solid #444" : "1px solid #ddd",
          background: darkMode ? "#262626" : "#fafafa",
          color: darkMode ? "#fff" : "#111",
          marginTop: "12px"
        }}
      />

      <div style={{ height: "1px", background: darkMode ? "#333" : "#e6e6e6", margin: "16px 0" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {patients.map(p => (
          <button
            key={p.id}
            onClick={() => navigate(`/patients/${p.id}`, { state: { patient: p } })}
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
              transition: "0.2s"
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                background: darkMode ? "#333" : "#dedede",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {p.name[0]}
            </div>

            <div>
              <strong>{p.name}</strong>
              <div style={{ opacity: 0.7 }}>Age: {p.age}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
