import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // Fetch students
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  // Add student
  const addStudent = () => {
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, course })
    })
    .then(res => res.json())
    .then(data => {
      setStudents([...students, data]);
      setName("");
      setCourse("");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student App</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <button onClick={addStudent}>Add</button>

      <hr />

      {students.map((s, i) => (
        <div key={i} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{s.name}</h3>
          <p>{s.course}</p>
        </div>
      ))}
    </div>
  );
}

export default App;