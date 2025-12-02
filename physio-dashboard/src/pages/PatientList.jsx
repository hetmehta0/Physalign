import { useState } from "react"; 

export default function PatientList({ patients, setSelectedPatient }) {
  return (
    <div className="page-container">
      <h2>Patients</h2>
      <div className="patient-list-grid">
        {patients.map(p => (
          <div 
            key={p.id} 
            className="patient-card"
            onClick={() => setSelectedPatient(p)}
          >
            <div className="patient-card-header">{p.name}</div>
            <div className="patient-card-info">Age: {p.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
