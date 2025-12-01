import { useLocation, useNavigate } from "react-router-dom";
import ChartPanel from "../components/ChartPanel";

export default function PatientTrends({ darkMode }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const patient = state?.patient;
  if (!patient) return <p>No patient selected</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>{patient.name}'s Trends</h2>

      <ChartPanel darkMode={darkMode} />

      <button
        onClick={() => navigate("/patients")}
        style={{
          padding: "12px",
          borderRadius: "8px",
          width: "180px",
          marginTop: "20px"
        }}
      >
        Back to list
      </button>
    </div>
  );
}
