require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { optionalAuth } = require('./middleware/authMiddleware');

const app = express();

// ─── Database ─────────────────────────────────────────────────────────────────
connectDB();

// ─── View Engine ──────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Global user injection (for navbar and views)
app.use(optionalAuth);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.redirect('/recipes'));

app.use('/', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/recipes/:id/comments', commentRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('error', {
    message: '404 – Page Not Found',
    currentUser: res.locals.currentUser || null,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).render('error', {
    message: '500 – Internal Server Error',
    currentUser: res.locals.currentUser || null,
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🍳 Recipe Platform running at http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
