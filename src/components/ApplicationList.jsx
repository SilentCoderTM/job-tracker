import ApplicationCard from "./ApplicationCard";

function ApplicationList({ applications, onMutate }) {
    // Show a message if the list is empty
    if (applications.length === 0) {
        return <p className="empty">No applications yet. Add one above!</p>;
    }

    return (
        <div className="application-list">
            {applications.map((app) => (
                <ApplicationCard key={app.id} application={app} onMutate={onMutate} />
            ))}
        </div>
    );
}

export default ApplicationList;