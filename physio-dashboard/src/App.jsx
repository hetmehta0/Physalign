import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

if (!loggedIn) {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={() => setLoggedIn(true)}>Sign In</button>
      </div>
    </div>
  );
} else {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/patients" element={<div>Patient List Page</div>} />
        <Route path="/patients/:id/trends" element={<div>Patient Trends Page</div>} />
        <Route path="*" element={<Navigate to="/patients" />} />
      </Routes>
    </Router>
  );
}
}
export default App;
