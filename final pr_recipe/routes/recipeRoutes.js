const express = require('express');
const router = express.Router();
const {
  getAllRecipes,
  getMyRecipes,
  getNewRecipeForm,
  createRecipe,
  getRecipe,
  getEditRecipeForm,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// ── Static protected routes MUST come before parameterized /:id ──────────────
router.get('/my', protect, getMyRecipes);
router.get('/new', protect, getNewRecipeForm);

// Public list & create
router.get('/', optionalAuth, getAllRecipes);
router.post('/', protect, upload.single('image'), createRecipe);

// Parameterized routes
router.get('/:id', optionalAuth, getRecipe);
router.get('/:id/edit', protect, getEditRecipeForm);
router.post('/:id/edit', protect, upload.single('image'), updateRecipe);
router.post('/:id/delete', protect, deleteRecipe);

module.exports = router;
