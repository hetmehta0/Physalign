'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Activity, Calendar, TrendingUp } from 'lucide-react';
import '../globals.css';

const mockPatients = [
  { id: 1, name: "Sarah Mitchell", age: 34, lastVisit: "2024-12-18", status: "active", exercises: 5, compliance: 87 },
  { id: 2, name: "James Chen", age: 56, lastVisit: "2024-12-19", status: "active", exercises: 7, compliance: 92 },
  { id: 3, name: "Emma Rodriguez", age: 41, lastVisit: "2024-12-15", status: "review", exercises: 4, compliance: 63 },
  { id: 4, name: "Michael O'Brien", age: 62, lastVisit: "2024-12-20", status: "active", exercises: 6, compliance: 78 },
  { id: 5, name: "Lisa Patel", age: 29, lastVisit: "2024-12-17", status: "active", exercises: 8, compliance: 95 },
];

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients] = useState(mockPatients);
  const router = useRouter();

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getComplianceClass = (compliance: number) => {
    if (compliance >= 80) return "compliance-high";
    if (compliance >= 60) return "compliance-medium";
    return "compliance-low";
  };

  const handleSelectPatient = (patient: any) => {
    localStorage.setItem('selectedPatient', JSON.stringify(patient));
    router.push('/trends');
  };

  return (
    <div className="app-container">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Patient Dashboard</h1>
            <p className="header-subtitle">Welcome back, Dr. Sarah Johnson</p>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="patient-grid">
          {filteredPatients.map(patient => (
            <div
              key={patient.id}
              onClick={() => handleSelectPatient(patient)}
              className="patient-card"
            >
              <div className="patient-card-header">
                <div className="patient-info">
                  <div className="patient-avatar">
                    <User className="icon-md" style={{ color: '#475569' }} />
                  </div>
                  <div>
                    <h3 className="patient-name">{patient.name}</h3>
                    <p className="patient-age">{patient.age} years old</p>
                  </div>
                </div>
                <span className={`status-badge ${patient.status === 'active' ? 'status-active' : 'status-review'}`}>
                  {patient.status}
                </span>
              </div>

              <div className="patient-stats">
                <div className="stat-row">
                  <span className="stat-label">
                    <Calendar className="icon-sm" />
                    Last visit
                  </span>
                  <span className="stat-value">{patient.lastVisit}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">
                    <Activity className="icon-sm" />
                    Exercises
                  </span>
                  <span className="stat-value">{patient.exercises} active</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">
                    <TrendingUp className="icon-sm" />
                    Compliance
                  </span>
                  <span className={getComplianceClass(patient.compliance)}>
                    {patient.compliance}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}