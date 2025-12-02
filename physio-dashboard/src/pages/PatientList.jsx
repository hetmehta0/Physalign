const [selectedPatient, setSelectedPatient] = useState(null);
const [patients] = useState([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
]);

<button onClick={() => setSelectedPatient(null)}>Back to Patient List</button>
