import { useState, useEffect } from "react";
import ApplicationList from "./components/ApplicationList";
import "./App.css";

function App() {
  // State for the applications array, loading flag, and error message
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all applications from the Express API
  const fetchApplications = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:5000/api/applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchApplications once when the component mounts
  useEffect(() => {
    fetchApplications();
  }, []);

  // Show loading or error states before rendering the list
  if (loading) return <p className="loading">Loading applications...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
      <div className="app">
        <h1>Job Application Tracker</h1>
        <ApplicationList applications={applications} onMutate={fetchApplications} />
      </div>
  );
}

export default App;