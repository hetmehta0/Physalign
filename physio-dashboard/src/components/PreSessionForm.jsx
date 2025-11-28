function PreSessionForm() {
    return (
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #eee",
        marginTop: "20px"
      }}>
        <h3 style={{ marginBottom: "12px" }}>Pre-Session Notes</h3>
  
        <ul style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
          <li>💡 Remind client to focus on knee alignment</li>
          <li>💡 Target form quality ≥ 75%</li>
          <li>💡 Stop if RPE = 8</li>
          <li>💡 Add 2 reps if last 3 sessions ≥ 85%</li>
        </ul>
  
        <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
          Notes can be customized for each client/session.
        </p>
      </div>
    );
  }
  
  export default PreSessionForm;
  

