function ChartPanel({ title, value, darkMode }) {
    return (
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #eee",
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#eee" : "#222",
      }}>
        <h3 style={{ marginBottom: "12px" }}>Session Graphs</h3>
  
        <div style={{
          height: "150px",
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#eee" : "#222",
          borderRadius: "10px",
          border: "1px dashed #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          fontStyle: "italic"
        }}>
          Chart placeholder
        </div>
  
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#555" }}>
          Graphs like fatigue, form quality, or RPE can go here.
        </div>
      </div>
    );
  }
  
  export default ChartPanel;
  