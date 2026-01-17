'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Activity, 
  TrendingUp, 
  Clock, 
  Edit2, 
  Save, 
  X, 
  Plus,
  Trash2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import '../legacy.css';
import Sidebar from '../components/Sidebar';

type Exercise = {
  id?: number;
  name: string;
  sets: number;
  reps: number;
  notes: string;
  lastModified?: string;
};

type Program = {
  id: string;
  physio_id: string;
  access_code: string;
  patient_name: string | null;
  exercises: Exercise[];
  notes: string | null;
  created_at: string;
  updated_at: string;
  last_accessed: string | null;
  expires_at: string | null;
};

export default function PatientDetail() {
  const [program, setProgram] = useState<Program | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    async function loadProgram() {
      // Get program from localStorage
      const stored = localStorage.getItem('selectedProgram');
      if (!stored) {
        router.push('/physios');
        return;
      }

      const storedProgram = JSON.parse(stored);

      // Fetch fresh data from Supabase
      const { data, error } = await supabase
        .from('exercise_programs')
        .select('*')
        .eq('id', storedProgram.id)
        .single();

      if (error || !data) {
        console.error('Error loading program:', error);
        router.push('/physios');
        return;
      }

      setProgram(data);
      setExercises(data.exercises || []);
      setLoading(false);
    }

    loadProgram();
  }, [router]);
  const handleAddExercise = () => {
    const newExercise = {
      name: '',
      sets: 3,
      reps: 10,
      notes: ''
    };
    
   
    setExercises([...exercises, newExercise]);
  };
  const removeExercise = (index: number) => {
    if (confirm('Are you sure you want to remove this exercise?')) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };


  const handleBack = () => {
    router.push('/physios');
  };

  const handleSave = async (id: number) => {
    if (!program) return;

    try {
      // Update the program in Supabase
      const { error } = await supabase
        .from('exercise_programs')
        .update({
          exercises: exercises,
          updated_at: new Date().toISOString()
        })
        .eq('id', program.id);

      if (error) throw error;

      alert('Changes saved successfully!');
      setEditingId(null);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save changes');
    }
  };
  
  const handleSaveProgram = async () => {
    if (!program) return;

    try {
      // Remove any exercises that have no name
      const validExercises = exercises.filter(ex => ex.name.trim() !== '');
      
      if (validExercises.length === 0) {
        alert('Add at least one exercise!');
        return;
      }

      // Update in Supabase
      const { error } = await supabase
        .from('exercise_programs')
        .update({
          exercises: validExercises,  // Save the array
          updated_at: new Date().toISOString()
        })
        .eq('id', program.id);  // Only update THIS program

      if (error) throw error;

      // Update local state
      setExercises(validExercises);
      setIsEditMode(false);
      alert('Saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save');
    }
  };
  const handleCancel = () => {
    // Reload from program data
    if (program && program.exercises) {
      setExercises(program.exercises);
    }
    setEditingId(null);
  };

  const updateExercise = (id: number, field: string, value: string | number) => {
    setExercises(prev =>
      prev.map((ex, index) => index === id ? { ...ex, [field]: value } : ex)
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="app-container flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading program data...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="app-container flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Program not found</p>
      </div>
    );
  }
return (
  <div className="app-container">
    <Sidebar />
    
    <header className="patient-header">
      <div className="patient-header-content">
        <button onClick={() => router.push('/patients')} className="back-button">
          <ChevronLeft className="icon-sm" />
          Back to programs
          router.push('/patients')
        </button>          
        <div className="patient-header-main">
          <div className="patient-header-avatar">
            {program.patient_name ? getInitials(program.patient_name) : 'UN'}
          </div>
          <div className="patient-header-info">
            <h1 className="patient-header-name">
              {program.patient_name || 'Unnamed Patient'}
            </h1>
            <p className="patient-header-meta">
              Code: {program.access_code} • Created: {new Date(program.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </header>

    <main className="content-wrapper">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Exercises</span>
            <Activity className="icon-sm" style={{ color: '#94a3b8' }} />
          </div>
          <div className="stat-card-value compliance-high">
            {exercises.length}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Access Code</span>
            <TrendingUp className="icon-sm" style={{ color: '#94a3b8' }} />
          </div>
          <div className="stat-card-value" style={{ fontSize: '1.5rem' }}>
            {program.access_code}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Last Accessed</span>
            <Clock className="icon-sm" style={{ color: '#94a3b8' }} />
          </div>
          <div className="stat-card-value" style={{ fontSize: '1rem' }}>
            {program.last_accessed 
              ? new Date(program.last_accessed).toLocaleDateString()
              : 'Never'}
          </div>
        </div>
      </div>

      {/* Exercise Program */}
      <section className="exercise-section">
        {/* Header with Edit/Save buttons */}
        <div className="exercise-header">
          <h2 className="exercise-title">Exercise Program</h2>
          {!isEditMode ? (
            <button
              onClick={() => setIsEditMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit2 className="w-4 h-4" />
              Edit Program
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProgram}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={() => {
                  setExercises(program?.exercises || []);
                  setIsEditMode(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Add Exercise button (only in edit mode) */}
        {isEditMode && (
          <button
            onClick={handleAddExercise}
            className="flex items-center gap-2 px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Exercise
          </button>
        )}

        {/* Exercise List */}
        {exercises.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No exercises in this program yet.</p>
          </div>
        ) : (
          <div className="exercise-list">
            {exercises.map((exercise, index) => (
              <article key={index} className="exercise-item">
                <div className="exercise-content">
                  <div className="exercise-details">
                    {/* Exercise Name */}
                    {isEditMode ? (
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => updateExercise(index, 'name', e.target.value)}
                        className="exercise-name-input"
                        placeholder="Exercise name"
                      />
                    ) : (
                      <h3 className="exercise-name">{exercise.name}</h3>
                    )}

                    {/* Sets & Reps */}
                    <div className="exercise-params">
                      <div className="param-group">
                        <label className="exercise-notes-label">Sets</label>
                        {isEditMode ? (
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                            className="param-input"
                          />
                        ) : (
                          <span className="param-value">{exercise.sets}</span>
                        )}
                      </div>
                      <div className="param-group">
                        <label className="exercise-notes-label">Reps</label>
                        {isEditMode ? (
                          <input
                            type="number"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                            className="param-input"
                          />
                        ) : (
                          <span className="param-value">{exercise.reps}</span>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="exercise-notes-label">Notes</label>
                      {isEditMode ? (
                        <textarea
                          value={exercise.notes}
                          onChange={(e) => updateExercise(index, 'notes', e.target.value)}
                          className="exercise-notes-input"
                          rows={2}
                          placeholder="Exercise notes"
                        />
                      ) : (
                        <p className="exercise-notes">{exercise.notes || 'No notes'}</p>
                      )}
                    </div>

                    {/* Last Modified */}
                    <p className="exercise-modified">
                      Last modified: {new Date(program.updated_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions - Delete button in edit mode */}
                  <div className="exercise-actions">
                    {isEditMode && (
                      <button
                        onClick={() => removeExercise(index)}
                        className="icon-button icon-button-cancel"
                        title="Delete Exercise"
                      >
                        <Trash2 className="icon-sm" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  </div>
)};