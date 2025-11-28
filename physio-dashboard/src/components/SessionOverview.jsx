function SessionOverview() {
    return (
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #eee",
        marginBottom: "20px"
      }}>
        <h2 style={{ marginBottom: "12px" }}>Session Overview</h2>
  
        <p style={{ fontSize: "14px", color: "#555" }}>
          This section will show today's session summary:
        </p>
  
        <ul style={{ fontSize: "14px", color: "#444", marginTop: "10px", lineHeight: "1.6" }}>
          <li>✔️ Sets & reps completed</li>
          <li>✔️ Video link</li>
          <li>✔️ Form quality %</li>
          <li>✔️ Fatigue curve</li>
        </ul>
      </div>
    );
  }
  
  export default SessionOverview;
  