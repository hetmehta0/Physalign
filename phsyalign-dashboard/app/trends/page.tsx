'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Activity, TrendingUp, Clock, Edit2, Save, X } from 'lucide-react';
import '../globals.css';

const mockExercises = [
  { id: 1, name: "Shoulder External Rotation", sets: 3, reps: 12, notes: "Use resistance band", lastModified: "2024-12-18" },
  { id: 2, name: "Hip Flexor Stretch", sets: 2, reps: 30, notes: "Hold 30 seconds each side", lastModified: "2024-12-15" },
  { id: 3, name: "Single Leg Balance", sets: 3, reps: 45, notes: "Progress to eyes closed", lastModified: "2024-12-18" },
  { id: 4, name: "Wall Squats", sets: 3, reps: 15, notes: "60 second holds", lastModified: "2024-12-12" },
  { id: 5, name: "Calf Raises", sets: 3, reps: 20, notes: "Double leg, progress to single", lastModified: "2024-12-18" },
];

export default function PatientDetail() {
  const [patient, setPatient] = useState<any>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [exercises, setExercises] = useState(mockExercises);
  const router = useRouter();

  useEffect(() => {
    // Load patient from localStorage
    const stored = localStorage.getItem('selectedPatient');
    if (stored) {
      setPatient(JSON.parse(stored));
    }
  }, []);

  const handleBack = () => {
    router.push('/patients');
  };

  const handleSave = async (id: number) => {
    console.log('Saving:', exercises.find(e => e.id === id));
    setEditingId(null);
  };

  const handleCancel = () => {
    setExercises(mockExercises);
    setEditingId(null);
  };

  const updateExercise = (id: number, field: string, value: any) => {
    setExercises(prev =>
      prev.map(ex => ex.id === id ? { ...ex, [field]: value } : ex)
    );
  };

  const getComplianceClass = (compliance: number) => {
    if (compliance >= 80) return "compliance-high";
    if (compliance >= 60) return "compliance-medium";
    return "compliance-low";
  };

  if (!patient) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#475569' }}>Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="page-header">
        <div className="header-content" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <button onClick={handleBack} className="back-button">
            <ChevronLeft className="icon-sm" />
            Back to patients
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="patient-avatar" style={{ width: '3.5rem', height: '3.5rem', backgroundColor: '#475569' }}>
              <User className="icon-lg" style={{ color: '#cbd5e1' }} />
            </div>
            <div>
              <h1 className="header-title" style={{ fontSize: '1.5rem' }}>{patient.name}</h1>
              <p className="header-subtitle">{patient.age} years old • Last visit: {patient.lastVisit}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper" style={{ paddingTop: '1.5rem' }}>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Active Exercises</span>
              <Activity className="icon-sm" style={{ color: '#94a3b8' }} />
            </div>
            <div className="stat-card-value">{patient.exercises}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Compliance Rate</span>
              <TrendingUp className="icon-sm" style={{ color: '#94a3b8' }} />
            </div>
            <div className={`stat-card-value ${getComplianceClass(patient.compliance)}`}>
              {patient.compliance}%
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Days Since Visit</span>
              <Clock className="icon-sm" style={{ color: '#94a3b8' }} />
            </div>
            <div className="stat-card-value">3</div>
          </div>
        </div>

        <div className="exercise-section">
          <div className="exercise-header">
            <h2 className="exercise-title">Exercise Program</h2>
          </div>
          <div className="exercise-list">
            {exercises.map((exercise) => {
              const isEditing = editingId === exercise.id;
              return (
                <div key={exercise.id} className="exercise-item">
                  <div className="exercise-content">
                    <div className="exercise-details">
                      {isEditing ? (
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                          className="exercise-name-input"
                        />
                      ) : (
                        <h3 className="exercise-name">{exercise.name}</h3>
                      )}
                      
                      <div className="exercise-params">
                        <div className="param-group">
                          <label className="exercise-notes-label">Sets</label>
                          {isEditing ? (
                            <input
                              type="number"
                              value={exercise.sets}
                              onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                              className="param-input"
                            />
                          ) : (
                            <span className="param-value">{exercise.sets}</span>
                          )}
                        </div>
                        <div className="param-group">
                          <label className="exercise-notes-label">Reps</label>
                          {isEditing ? (
                            <input
                              type="number"
                              value={exercise.reps}
                              onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value))}
                              className="param-input"
                            />
                          ) : (
                            <span className="param-value">{exercise.reps}</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="exercise-notes-label">Notes</label>
                        {isEditing ? (
                          <textarea
                            value={exercise.notes}
                            onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                            className="exercise-notes-input"
                            rows={2}
                          />
                        ) : (
                          <p className="exercise-notes">{exercise.notes}</p>
                        )}
                      </div>

                      <p className="exercise-modified">Last modified: {exercise.lastModified}</p>
                    </div>

                    <div className="exercise-actions">
                      {isEditing ? (
                        <>
                          <button onClick={() => handleSave(exercise.id)} className="icon-button icon-button-save">
                            <Save className="icon-sm" />
                          </button>
                          <button onClick={handleCancel} className="icon-button icon-button-cancel">
                            <X className="icon-sm" />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setEditingId(exercise.id)} className="icon-button icon-button-edit">
                          <Edit2 className="icon-sm" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}