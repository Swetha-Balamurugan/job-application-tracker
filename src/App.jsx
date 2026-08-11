import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import Header from "./Components/Header";
import Statistics from "./Components/Statistics";
import JobForm from "./Components/Jobform";
import SearchBar from "./Components/SearchBar";
import KanbanBoard from "./Components/KanbanBoard";
function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");

 
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    if (!savedJobs) {
      return [];
    }

    const parsedJobs = JSON.parse(savedJobs);

    
    return parsedJobs.map((job) => ({
      ...job,
      id: job.id || crypto.randomUUID(),
    }));
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  
  function addJob() {
    if (jobTitle.trim() === "") return;

    if (isEditing) {
      const updatedJobs = [...jobs];

      updatedJobs[editIndex] = {
        ...updatedJobs[editIndex],
        company: jobTitle.trim(),
        status: status,
      };

      setJobs(updatedJobs);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const newJob = {
        id: crypto.randomUUID(),
        company: jobTitle.trim(),
        status: status,
        date: new Date().toLocaleDateString("en-GB"),
      };

      setJobs([...jobs, newJob]);
    }

    setJobTitle("");
    setStatus("Applied");
  }

  
  function editJob(index) {
    setJobTitle(jobs[index].company);
    setStatus(jobs[index].status || "Applied");
    setEditIndex(index);
    setIsEditing(true);
  }

 
  function deleteJob(index) {
    setJobs(jobs.filter((_, i) => i !== index));
  }

 
  function clearAllJobs() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all jobs?"
    );

    if (confirmDelete) {
      setJobs([]);
    }
  }

  
  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(search.toLowerCase())
  );

 
  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const offerJobs = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <div
        className="container mt-5"
        style={{ maxWidth: "1100px" }}
      >
       
        <Header />

       
        <div className="text-end mb-3">
          <button
            type="button"
            className={`btn ${
              darkMode ? "btn-light" : "btn-dark"
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <>
                <FaSun className="me-2" />
                Light Mode
              </>
            ) : (
              <>
                <FaMoon className="me-2" />
                Dark Mode
              </>
            )}
          </button>
        </div>

      
        <Statistics
          totalJobs={totalJobs}
          appliedJobs={appliedJobs}
          interviewJobs={interviewJobs}
          rejectedJobs={rejectedJobs}
          offerJobs={offerJobs}
        />

       
        <JobForm
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          status={status}
          setStatus={setStatus}
          addJob={addJob}
          isEditing={isEditing}
        />

      
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

       
        <div className="text-end mb-3 mt-3">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={clearAllJobs}
          >
            Clear All
          </button>
        </div>

        
        
        {jobs.length === 0 ? (
          <p className="text-center text-muted mt-4">
            No jobs added yet.
          </p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-danger mt-4">
            No matching jobs found.
          </p>
        ) : (
          <KanbanBoard
            jobs={filteredJobs}
            setJobs={setJobs}
            editJob={editJob}
            deleteJob={deleteJob}
          />
        )}
      </div>
    </div>
  );
}

export default App;