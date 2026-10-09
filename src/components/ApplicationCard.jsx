function ApplicationCard({ application }) {
    const statusClass = application.status.toLowerCase();

    return (
        <div className={`card ${statusClass}`}>
            <h3>{application.company}</h3>
            <p className="position">{application.position}</p>
            <p className="date">Applied: {new Date(application.date_applied).toLocaleDateString()}</p>
            {application.notes && <p className="notes">{application.notes}</p>}
            <p className="status">{application.status}</p>
        </div>
    );
}

export default ApplicationCard;