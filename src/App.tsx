import { useState } from "react";
import JobModal from "./components/JobModal";
import "./App.css";
import { createJob } from "./api/jobApi";

interface Job {
  jobTitle: string;
  jobTitleInAmharic: string;
  jobDescription: string;
  status: string;
  code: string;
}

function App() {
  const [error, setError] = useState("");
  const [showJobModal, setShowJobModal] = useState(false); // Default to false
  const [isPopup, setIsPopup] = useState(false);
  const [showCreateJobForm, setShowCreateJobForm] = useState(true); // Show the form by default

  const handleCreateJob = async (job: Job) => {
    try {
      await createJob(job);
      console.log("Job created successfully!");
      alert("Job created successfully!");
    } catch (err: any) {
      console.error("Error creating job:", err.response?.data || err.message);
      setError("Failed to create job.");
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <h1>Job Register</h1>
        <a
          href="#"
          className="home-link"
          onClick={(e) => {
            e.preventDefault();
            setShowJobModal(true);
            setShowCreateJobForm(false); // Ensure the Register Job form is not shown
            setIsPopup(false);
          }}
        >
          Home
        </a>
      </header>

      {/* Sidebar and Main Content */}
      <div className="app-container">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <ul>
            <li>
              <button
                className="sidebar-link"
                onClick={() => {
                  setShowCreateJobForm(true); // Trigger the Register Job form
                  setShowJobModal(false); // Ensure the main modal is not shown
                }}
              >
                Create Job
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        {/* Main Content */}
        <main className="main-content">
          {error && <p className="error">{error}</p>}
          {showJobModal && (
            <div className={`modal-overlay ${isPopup ? "popup" : ""}`}>
              <div className="modal-content">
                <JobModal
                  onSave={handleCreateJob}
                  showCreateJobForm={showCreateJobForm} // Pass the state to JobModal
                  setShowCreateJobForm={setShowCreateJobForm} // Allow JobModal to control the pop-up
                />
              </div>
            </div>
          )}
          {showCreateJobForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <JobModal
                  onSave={handleCreateJob}
                  showCreateJobForm={true} // Force the Register Job form to display
                  setShowCreateJobForm={setShowCreateJobForm}
                />
              </div>
            </div>
          )}
          {!showJobModal && !showCreateJobForm && (
            <p>Welcome to the Job Register Application!</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
