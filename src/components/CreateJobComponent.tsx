import { useState, useEffect } from "react";
import { createJob, getJobTitles } from "../api/jobApi";

const CreateJobComponent = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleInAmharic, setJobTitleInAmharic] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [status] = useState("Active"); // Default value
  const [code] = useState(() =>
    Math.random().toString(36).substr(2, 5).toUpperCase()
  ); // Generate random code
  const [jobTitles, setJobTitles] = useState<{ jobTitle: string }[]>([]); // Array of job objects

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const response = await getJobTitles();
        if (!Array.isArray(response)) {
          throw new Error("Invalid API response format");
        }
        setJobTitles(response);
      } catch (error) {
        console.error("Error fetching job titles:", error);
        alert("Failed to fetch job titles. Please try again later.");
      }
    };

    fetchJobTitles();
  }, []);

  const handleCreateJob = async () => {
    if (!jobTitle || !jobTitleInAmharic || !jobDescription) {
      alert("Please fill in all fields to create a new job.");
      return;
    }

    const newJob = {
      jobTitle,
      jobTitleInAmharic,
      jobDescription,
      status,
      code,
    };

    try {
      await createJob(newJob);
      alert("Job created successfully!");
      setJobTitle("");
      setJobTitleInAmharic("");
      setJobDescription("");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job. Please try again.");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Create New Job</h2>
      <form>
        <div>
          <label>Job Title:</label>
          <select
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ced4da",
              borderRadius: "5px",
            }}
          >
            <option value="">Select a Job Title</option>
            {jobTitles.map((job, idx) => (
              <option key={idx} value={job.jobTitle}>
                {job.jobTitle}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Job Title (Amharic):</label>
          <input
            type="text"
            placeholder="Enter Job Title in Amharic"
            value={jobTitleInAmharic}
            onChange={(e) => setJobTitleInAmharic(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ced4da",
              borderRadius: "5px",
            }}
          />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            placeholder="Enter Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              resize: "none",
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleCreateJob}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJobComponent;
