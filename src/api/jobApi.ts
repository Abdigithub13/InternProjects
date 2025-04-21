import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getJobTitles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/job-details`);

    // Log the response to verify its structure
    console.log("API Response:", response.data);

    // Validate the response structure
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid API response format: Expected an array");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching job titles:", error);

    // Provide a fallback or rethrow the error
    throw new Error(
      "Failed to fetch job titles. Please check the API or network connection."
    );
  }
};

// Create a new job
export const createJob = async (job: {
  jobTitle: string;
  jobTitleInAmharic: string;
  jobDescription: string;
  status: string;
  code: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs`, job, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};
