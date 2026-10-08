const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all applications, newest first
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM applications ORDER BY date_applied DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM applications WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST a new application
router.post("/", async (req, res) => {
    try {
        const { company, position, notes } = req.body;
        const result = await pool.query(
            "INSERT INTO applications (company, position, notes) VALUES ($1, $2, $3) RETURNING *",
            [company, position, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT (update) an application by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { company, position, status, notes } = req.body;
        const result = await pool.query(
            "UPDATE applications SET company = $1, position = $2, status = $3, notes = $4 WHERE id = $5 RETURNING *",
            [company, position, status, notes, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE an application by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM applications WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.json({ message: "Application deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;