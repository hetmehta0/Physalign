import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import "..//App.css";
export default function SignIn({ setUser }) {
    const [physioUserName, setPhysioUserName] = useState("")
    const [physioUserPassword, setPhysioUserPassword] = useState("")

    const handleUserName = (event) => {
        setPhysioUserName(event.target.value);
    }
    const handleUserPassword = (event) => {
        setPhysioUserPassword(event.target.value);
    }
    const handleSignIn = (event) => {
        if (physioUserName === "TheOne" && physioUserPassword === "Testing1") {
            setUser(true); // set user as logged in
        } else {
            alert("Wrong credentials"); // temporary feedback
        }
    }

    return (
        <div className="signin-container">
        <div className="signin-card">
            <input
            type="text"
            placeholder="Username"
            value={physioUserName}
            onChange={handleUserName}
            />
            <input
            type="password"
            placeholder="Password"
            value={physioUserPassword}
            onChange={handleUserPassword}
            />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
        </div>
    );
    }
