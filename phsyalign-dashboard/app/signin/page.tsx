'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';


export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    if (username === "demo" && password === "demo") {
      // Store auth state (you might want to use a better solution later)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('physioName', 'Dr. Sarah Johnson');
      router.push('/patients');
    } else {
      setError("Invalid credentials");
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
            <label className="form-label{">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
              className="form-input"
              placeholder="Enter your username"
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
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button onClick={handleSignIn} className="btn-primary">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}