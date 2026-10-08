const express = require('express');
const cors = require('cors');
require('dotenv').config();
const applicationRouter = require('./routes/application');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/applications", applicationRouter);

app.get('/api/test', async (req, res) => {
    const pool = require('./db');
    const result = await pool.query("SELECT NOW()");
    res.json(result);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});