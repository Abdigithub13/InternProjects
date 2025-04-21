import { useEffect, useState } from "react";
import "../styles/JobModal.css";
import { getJobTitles, createJob } from "../api/jobApi";

type Job = {
  jobTitle: string;
  jobTitleInAmharic: string;
  jobDescription: string;
  status: string;
  code: string;
};

interface JobModalProps {
  onSave: (job: Job) => Promise<void>;
  showCreateJobForm: boolean;
  setShowCreateJobForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobModal: React.FC<JobModalProps> = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [jobTitleInAmharic, setJobTitleInAmharic] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [jobTitlesInAmharic, setJobTitlesInAmharic] = useState<string[]>([]);
  const [jobDescriptions, setJobDescriptions] = useState<string[]>([]);
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);

  // Separate state for the pop-up form
  const [popupTitle, setPopupTitle] = useState("");
  const [popupJobTitleInAmharic, setPopupJobTitleInAmharic] = useState("");
  const [popupJobDescription, setPopupJobDescription] = useState("");

  useEffect(() => {
    fetchJobData();
  }, []);

  const fetchJobData = async () => {
    try {
      const response = await getJobTitles(); // Ensure this calls the /job-details endpoint
      console.log("API Response:", response); // Log the full response

      // Map the response to extract fields
      const titles = response.map((job) => job.jobTitle || "N/A");
      const titlesInAmharic = response.map(
        (job) => job.jobTitleInAmharic || "N/A"
      );
      const descriptions = response.map((job) => job.jobDescription || "N/A");

      setJobTitles(titles);
      setJobTitlesInAmharic(titlesInAmharic);
      setJobDescriptions(descriptions);

      console.log("Job Titles:", titles);
      console.log("Job Titles in Amharic:", titlesInAmharic);
      console.log("Job Descriptions:", descriptions);
    } catch (error) {
      console.error("Failed to fetch job data:", error);
    }
  };
  const handleSave = async () => {
    if (!title || !jobTitleInAmharic || !jobDescription) {
      alert("Please fill in all fields.");
      return;
    }

    const jobData: Job = {
      jobTitle: title,
      jobTitleInAmharic,
      jobDescription,
      status: "Active",
      code: Math.random().toString(36).substr(2, 5).toUpperCase(),
    };

    try {
      await onSave(jobData);
      setTitle("");
      setJobTitleInAmharic("");
      setJobDescription("");
      await fetchJobData(); // Refresh dropdowns after saving
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleCreateJob = async () => {
    if (!popupTitle || !popupJobTitleInAmharic || !popupJobDescription) {
      alert("Please fill in all fields.");
      return;
    }

    const newJob: Job = {
      jobTitle: popupTitle,
      jobTitleInAmharic: popupJobTitleInAmharic,
      jobDescription: popupJobDescription,
      status: "Active",
      code: Math.random().toString(36).substr(2, 5).toUpperCase(),
    };

    try {
      await createJob(newJob);
      alert("New job created successfully!");
      setShowCreateJobForm(false); // Close the modal
      setPopupTitle("");
      setPopupJobTitleInAmharic("");
      setPopupJobDescription("");
      await fetchJobData(); // Refresh dropdowns after creating a job
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="job-modal-container">
      <div className="modal-content">
        <div className="modal-left">
          <h2 className="text-center">Register Job</h2>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title:</label>
            <select
              id="jobTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            >
              <option value="">--Select One--</option>
              {jobTitles.map((job, idx) => (
                <option key={idx} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="jobTitleInAmharic">Job Title (Amharic):</label>
            <select
              id="jobTitleInAmharic"
              className="form-control"
              value={jobTitleInAmharic}
              onChange={(e) => setJobTitleInAmharic(e.target.value)}
              required
            >
              <option value="">--Select One--</option>
              {jobTitlesInAmharic.map((title, idx) => (
                <option key={idx} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Job Description:</label>
            <select
              id="jobDescription"
              className="form-control"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            >
              <option value="">--Select One--</option>
              {jobDescriptions.map((desc, idx) => (
                <option key={idx} value={desc}>
                  {desc}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSave}
            id="saveButton"
            className="btn btn-success"
          >
            Save
          </button>
        </div>

        <div className="modal-right">
          <button
            id="showCreateJobFormButton"
            className="btn btn-secondary"
            onClick={() => setShowCreateJobForm(true)}
          >
            Register Job
          </button>
        </div>
      </div>

      {showCreateJobForm && (
        <div className="popup-modal">
          <div className="popup-content">
            <h3>Create New Job</h3>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Job Title"
                value={popupTitle}
                onChange={(e) => setPopupTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Job Title (Amharic):</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Job Title in Amharic"
                value={popupJobTitleInAmharic}
                onChange={(e) => setPopupJobTitleInAmharic(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Job Description:</label>
              <textarea
                className="form-control"
                placeholder="Enter Job Description"
                value={popupJobDescription}
                onChange={(e) => setPopupJobDescription(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleCreateJob}>
              Create Job
            </button>
            <button
              className="btn btn-danger mt-2"
              onClick={() => setShowCreateJobForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobModal;
