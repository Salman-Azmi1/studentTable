import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Loader from "./components/Loader";
import studentsData from "./data/studentsData";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (updated) => {
    setStudents(students.map(s => s.id === updated.id ? updated : s));
    setEditStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Students Table</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          <StudentForm
            addStudent={addStudent}
            updateStudent={updateStudent}
            editStudent={editStudent}
          />

          <StudentTable
            students={students}
            deleteStudent={deleteStudent}
            setEditStudent={setEditStudent}
          />
        </>
      )}
    </div>
  );
}

export default App;
