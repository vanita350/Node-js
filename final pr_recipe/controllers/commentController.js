const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

// ─── POST /recipes/:id/comments ──────────────────────────────────────────────
const addComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const recipeId = req.params.id;

    if (!content || content.trim() === '') {
      return res.redirect(`/recipes/${recipeId}`);
    }

    const comment = await Comment.create({
      content: content.trim(),
      author: req.user._id,
      recipe: recipeId,
      rating: rating ? parseInt(rating) : null,
    });

    // Push comment reference to recipe
    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { comments: comment._id },
    });

    res.redirect(`/recipes/${recipeId}`);
  } catch (error) {
    console.error('Add Comment Error:', error);
    res.redirect(`/recipes/${req.params.id}`);
  }
};

// ─── POST /recipes/:id/comments/:commentId/delete ────────────────────────────
const deleteComment = async (req, res) => {
  try {
    const { id: recipeId, commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.redirect(`/recipes/${recipeId}`);
    }

    // Only comment author or admin can delete
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).render('error', {
        message: '🚫 Access Denied: You can only delete your own comments.',
        currentUser: req.user,
      });
    }

    // Remove from recipe's comments array
    await Recipe.findByIdAndUpdate(recipeId, {
      $pull: { comments: commentId },
    });

    await Comment.findByIdAndDelete(commentId);

    res.redirect(`/recipes/${recipeId}`);
  } catch (error) {
    console.error('Delete Comment Error:', error);
    res.redirect(`/recipes/${req.params.id}`);
  }
};

module.exports = { addComment, deleteComment };
