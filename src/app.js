const express = require('express');
const cookieParser = require('cookie-parser');
// const cors = require('cors')
// const morgan = require('morgan')

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

module.exports = app;