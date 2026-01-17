'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import '../globals.css';
import Sidebar from '../components/Sidebar';

//Generate Unique Code 
function generateAccessCode(length: number) {
    const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
type Exercise = {
  name: string;
  sets: number;
  reps: number;
  notes: string;
};

export default function createProgram() {
  const [patientName, setPatientName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: 3, reps: 10, notes: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const router = useRouter();

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, reps: 10, notes: '' }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updatedExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  }

  const handleCreateProgram = async () => {
    try {
        setLoading(true)

        // Ensure user is signed in 
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            throw new Error('User not authenticated');
        }

        //generate patient code 
        const accessCode = generateAccessCode(8);

        //Update database 
        const { data, error } = await supabase
            .from('exercise_programs')
            .insert([{
                physio_id: user.id,
                access_code: accessCode,
                patient_name: patientName || null,
                exercises: exercises.filter(ex => ex.name.trim() !== ''), //remove empty exercises
                notes: null
            }])
            .select()
            .single();
        if (error) {
            throw error;
        }
        setGeneratedCode(accessCode);
        setLoading(false);
    } catch(error) {
        console.error('Error creating program:', error);
        alert('Failed to create program');
        setLoading(false);
    }
    }
      // If code was generated, show success screen
  if (generatedCode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Program Created! 🎉</h2>
          <p className="text-gray-600 mb-4">Share this code with your patient:</p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <p className="text-4xl font-bold text-blue-600 tracking-wider">
              {generatedCode}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(generatedCode)}
              className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Copy Code
            </button>
            <button
              onClick={() => router.push('/physios')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="page-header">
        <h1 className="header-title">Create Exercise Program</h1>
      </div>

      <div className="content-wrapper max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Patient Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name (Optional)
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Exercises */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Exercises</h2>
              <button
                onClick={addExercise}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Exercise
              </button>
            </div>

            {exercises.map((exercise, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Exercise {index + 1}</h3>
                  {exercises.length > 1 && (
                    <button
                      onClick={() => removeExercise(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => updatedExercise(index, 'name', e.target.value)}
                    placeholder="Exercise name"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Sets</label>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => updatedExercise(index, 'sets', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Reps</label>
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => updatedExercise(index, 'reps', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <textarea
                    value={exercise.notes}
                    onChange={(e) => updatedExercise(index, 'notes', e.target.value)}
                    placeholder="Notes (optional)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Create Button */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/physios')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProgram}
              disabled={loading || exercises.every(ex => ex.name.trim() === '')}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Creating...' : 'Create Program'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}