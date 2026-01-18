'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import '../legacy.css';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      console.log('Attempting sign in...'); // Debug log

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Sign in response:', { data, error }); // Debug logcbc

      if (error) {
        console.error('Sign in error:', error); // Debug log
        setError(error.message);
        setLoading(false);
      } else {
        console.log('Sign in successful, redirecting...'); // Debug log
        router.push('/patients');
        router.refresh(); // Force a refresh
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="signin-header">
          <h1 className="signin-title">PhysioTrack</h1>
          <p className="signin-subtitle">Sign in to manage your patients</p>
        </div>
        <div className="signin-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
              className="form-input"
              placeholder="demo@physio.com"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
              className="form-input"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <button 
            onClick={handleSignIn} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}