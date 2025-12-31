import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PatientList from "../../phsyalign-dashboard/app/patients/page.js";
import "./app.css";
import "../../phsyalign-dashboard/app/components/Sidebar.js"
import SignIn from "../../phsyalign-dashboard/app/signin/page.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patients] = useState([
    { id: 1, name: "Alice Smith", age: 30 },
    { id: 2, name: "Bob Johnson", age: 25 },
    { id: 3, name: "Charlie Brown", age: 40 },
  ]);
  if (!loggedIn) {
    return (
      <SignIn
        setIsLoggedIn={setLoggedIn}
        setPhysioName={setUser}
      />
    );
  }

  if (!selectedPatient) {
    return <PatientList patients={patients} setSelectedPatient={setSelectedPatient} />;
  }

  return <PatientTrends patient={selectedPatient} setSelectedPatient={setSelectedPatient} />;


}
export default App;
