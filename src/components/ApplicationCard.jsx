import { useState } from "react";

function ApplicationCard({ application, onMutate }) {
    const statusClass = application.status.toLowerCase();

    // Send a DELETE request to remove this application from the database
    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/applications/${application.id}`,
                { method: "DELETE" }
            );
            if (!response.ok) throw new Error("Failed to delete");
            onMutate();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className={`card ${statusClass}`}>
            <h3>{application.company}</h3>
            <p className="position">{application.position}</p>
            <p className="date">Applied: {new Date(application.date_applied).toLocaleDateString()}</p>
            {application.notes && <p className="notes">{application.notes}</p>}
            <p className="status">{application.status}</p>
            <div className="card-actions">
                <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
        </div>
    );
}

export default ApplicationCard;