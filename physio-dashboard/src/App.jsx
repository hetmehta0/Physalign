import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
function App() {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </div>
    </div>
  );
}

export default App;
