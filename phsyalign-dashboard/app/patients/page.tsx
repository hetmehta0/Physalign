'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Activity, Calendar, TrendingUp, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import '../legacy.css';
import Sidebar from '../components/Sidebar';


//Set Type 
type Program = {
  id: string;
  physio_id: string;
  access_code: string;
  patient_name: string | null;
  exercises: any[];
  notes: string | null;
  created_at: string;
  updated_at: string;
  last_accessed: string | null;
  expires_at: string | null;
};




export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [programs, setPrograms] = useState<Program[]>([]); // Add type here
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { 
    async function fetchPrograms() {
      const { data, error } = await supabase
        .from('exercise_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching programs:', error);
      } else {
        setPrograms(data || []);
      }
      setLoading(false);
    }
    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(p =>
    p.patient_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProgram = (program: any) => {
    localStorage.setItem('selectedProgram', JSON.stringify(program));
    router.push('/trends');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading programs...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Exercise Programs</h1>
            <p className="header-subtitle">Welcome back, Dr. Sarah Johnson</p>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="flex justify-between items-center mb-6">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button
            onClick={() => router.push('/createProgram')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="icon-sm" />
            Create Program
          </button>
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No programs yet. Create your first one!</p>
          </div>
        ) : (
          <div className="patient-grid">
            {filteredPrograms.map(program => (
              <div
                key={program.id}
                onClick={() => handleSelectProgram(program)}
                className="patient-card"
              >
                <div className="patient-card-header">
                  <div className="patient-info">
                    <div className="patient-avatar">
                      <User className="icon-md" style={{ color: '#475569' }} />
                    </div>
                    <div>
                      <h3 className="patient-name">{program.patient_name || 'Unnamed Patient'}</h3>
                      <p className="patient-age">Code: {program.access_code}</p>
                    </div>
                  </div>
                  <span className="status-badge status-active">
                    Active
                  </span>
                </div>

                <div className="patient-stats">
                  <div className="stat-row">
                    <span className="stat-label">
                      <Calendar className="icon-sm" />
                      Created
                    </span>
                    <span className="stat-value">
                      {new Date(program.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">
                      <Activity className="icon-sm" />
                      Exercises
                    </span>
                    <span className="stat-value">
                      {program.exercises?.length || 0} exercises
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">
                      <TrendingUp className="icon-sm" />
                      Last Accessed
                    </span>
                    <span className="stat-value">
                      {program.last_accessed 
                        ? new Date(program.last_accessed).toLocaleDateString()
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}