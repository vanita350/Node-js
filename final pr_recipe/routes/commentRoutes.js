const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent
const { addComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// POST /recipes/:id/comments – add a comment (protected)
router.post('/', protect, addComment);

// POST /recipes/:id/comments/:commentId/delete – delete a comment (protected)
router.post('/:commentId/delete', protect, deleteComment);

module.exports = router;
