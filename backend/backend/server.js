require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        console.error('Check MONGO_URI in .env and your Atlas network access (IP whitelist).');
        process.exit(1);
    }
}

start();
