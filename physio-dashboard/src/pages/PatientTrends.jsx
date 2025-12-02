export default function PatientTrends({ patient, setSelectedPatient }) {
  return (
    <div className="page-container">
      <div className="patient-detail-card">
        <h2>{patient.name}</h2>
        <p>Age: {patient.age}</p>
        {/* Stats / trends go here */}
        <button onClick={() => setSelectedPatient(null)}>Back to Patient List</button>
      </div>
    </div>
  );
}
