// you should must run `npm install cors dotenv express`
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ============ SERVER START ============

app.listen(PORT, () => {
    console.log(`🚀 AI Task Agent running on http://localhost:${PORT}`);
});