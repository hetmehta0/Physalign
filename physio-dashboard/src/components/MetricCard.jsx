function MetricCard({ title, value, darkMode }) {
    return (
      <div style={{
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#eee" : "#222",
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid",
        borderColor: darkMode ? "#333" : "#eee",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <h4 style={{ margin: 0, fontSize: "14px" }}>{title}</h4>
        <p style={{ margin: "8px 0 0 0", fontSize: "20px", fontWeight: "600" }}>{value}</p>
      </div>
    );
  }
  export default MetricCard;
  