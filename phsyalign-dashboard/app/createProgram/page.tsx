'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Save, ChevronLeft, Activity } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

export default function CreateProgram() {
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

  // Success screen
  if (generatedCode) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 border border-gray-100">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-4xl">🎉</div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Program Created!</h2>
                <p className="text-gray-600 text-lg">Share this access code with your patient</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100 shadow-inner">
              <p className="text-5xl font-bold text-blue-600 tracking-widest text-center font-mono">
                {generatedCode}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 space-y-0">
              <button
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Copy Code
              </button>
              <button
                onClick={() => router.push('/physios')}
                className="flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={() => router.push("/physios")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Create Exercise Program
              </h1>
            </div>
            <p className="text-base sm:text-lg text-gray-600 ml-14">
              Build a custom exercise plan tailored for your patient
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
          <div className="p-6 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">
            
            {/* Patient Name Section */}
            <div className="space-y-4">
              <label className="block text-base font-semibold text-gray-900">
                Patient Name
                <span className="text-gray-500 font-normal ml-2">(Optional)</span>
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient's name"
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-base"
              />
            </div>

            {/* Exercises Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>Exercises</span>
                  <span className="text-base font-normal text-gray-500">({exercises.length})</span>
                </h2>
                <button
                  onClick={addExercise}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add Exercise
                </button>
              </div>

              {/* Scrollable Exercise Cards Container */}
              <div className="max-h-[600px] overflow-y-auto overflow-x-hidden pr-2">
                <div className="space-y-6">
                  {exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 sm:p-5 border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 space-y-4"
                    >
                      {/* Exercise Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-md text-sm font-bold shadow-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base text-gray-900">Exercise {index + 1}</h3>
                          </div>
                        </div>
                        {exercises.length > 1 && (
                          <button
                            onClick={() => removeExercise(index)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
                            aria-label="Remove exercise"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Exercise Name */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-700">
                          Exercise Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => updatedExercise(index, "name", e.target.value)}
                          placeholder="e.g., Squats, Push-ups, Lunges"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 text-sm"
                        />
                      </div>

                      {/* Sets and Reps Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-gray-700">
                            Sets
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={exercise.sets}
                            onChange={(e) => updatedExercise(index, "sets", parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-gray-700">
                            Reps
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={exercise.reps}
                            onChange={(e) => updatedExercise(index, "reps", parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 text-sm"
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-700">
                          Notes <span className="text-gray-500 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          value={exercise.notes}
                          onChange={(e) => updatedExercise(index, "notes", e.target.value)}
                          placeholder="Add instructions or notes..."
                          rows={2}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 resize-none text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-8 border-t-2 border-gray-100">
              <button
                onClick={() => router.push("/physios")}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProgram}
                disabled={loading || exercises.every((ex) => ex.name.trim() === "")}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
              >
                <Save className="w-5 h-5" />
                {loading ? "Creating..." : "Create Program"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}