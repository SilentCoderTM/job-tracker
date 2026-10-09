import { useState } from "react";

function AddApplication({ onMutate }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!company || !position) return;
        try {
            const response = await fetch("http://localhost:5000/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ company, position, notes }),
            });
            if (!response.ok) throw new Error("Failed to add application");
            // Clear the form after a successful submission
            setCompany("");
            setPosition("");
            setNotes("");
            onMutate();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
            <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
            <input type="text" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button type="submit">Add Application</button>
        </form>
    );
}

export default AddApplication;