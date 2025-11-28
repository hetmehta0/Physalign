function ChartPanel() {
    return (
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #eee"
      }}>
        <h3 style={{ marginBottom: "12px" }}>Session Graphs</h3>
  
        <div style={{
          height: "150px",
          background: "#f0f0f0",
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
  