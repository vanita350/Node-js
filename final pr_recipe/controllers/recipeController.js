const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Comment = require('../models/Comment');

// ─── GET /recipes ─────────────────────────────────────────────────────────────
// List all recipes (public) with author populated
const getAllRecipes = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    const categories = [
      'All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert',
      'Snack', 'Beverage', 'Soup', 'Salad', 'Appetizer', 'Other',
    ];

    res.render('recipeList', {
      recipes,
      categories,
      selectedCategory: category || 'All',
      search: search || '',
      currentUser: req.user || null,
    });
  } catch (error) {
    console.error('Get All Recipes Error:', error);
    res.render('error', { message: 'Failed to load recipes.', currentUser: req.user || null });
  }
};

// ─── GET /recipes/my ─────────────────────────────────────────────────────────
// Get recipes created by the logged-in user (protected)
const getMyRecipes = async (req, res) => {
  try {
    // Populate user's recipes array via User model reference
    const userWithRecipes = await User.findById(req.user._id).populate({
      path: 'recipes',
      populate: { path: 'author', select: 'username' },
      options: { sort: { createdAt: -1 } },
    });

    res.render('myRecipes', {
      recipes: userWithRecipes.recipes,
      currentUser: req.user,
    });
  } catch (error) {
    console.error('Get My Recipes Error:', error);
    res.render('error', { message: 'Failed to load your recipes.', currentUser: req.user });
  }
};

// ─── GET /recipes/new ────────────────────────────────────────────────────────
const getNewRecipeForm = (req, res) => {
  const categories = [
    'Breakfast', 'Lunch', 'Dinner', 'Dessert',
    'Snack', 'Beverage', 'Soup', 'Salad', 'Appetizer', 'Other',
  ];
  res.render('recipeForm', {
    recipe: null,
    categories,
    error: null,
    currentUser: req.user,
  });
};

// ─── POST /recipes ────────────────────────────────────────────────────────────
const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, category, cookTime, servings, difficulty } =
      req.body;

    // Store uploaded image path if file exists
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    // ingredients come as comma-separated string or array
    const ingredientsArr = Array.isArray(ingredients)
      ? ingredients.filter((i) => i.trim())
      : ingredients.split('\n').map((i) => i.trim()).filter(Boolean);

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: ingredientsArr,
      instructions,
      category,
      cookTime: cookTime || 30,
      servings: servings || 4,
      difficulty,
      image,
      author: req.user._id,
    });

    // Add recipe reference to user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { recipes: recipe._id },
    });

    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    console.error('Create Recipe Error:', error);
    const categories = [
      'Breakfast', 'Lunch', 'Dinner', 'Dessert',
      'Snack', 'Beverage', 'Soup', 'Salad', 'Appetizer', 'Other',
    ];
    res.render('recipeForm', {
      recipe: null,
      categories,
      error: 'Failed to create recipe. Please check all fields.',
      currentUser: req.user,
    });
  }
};

// ─── GET /recipes/:id ────────────────────────────────────────────────────────
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username avatar' },
        options: { sort: { createdAt: -1 } },
      });

    if (!recipe) {
      return res.render('error', { message: 'Recipe not found.', currentUser: req.user || null });
    }

    res.render('recipeItem', {
      recipe,
      currentUser: req.user || null,
    });
  } catch (error) {
    console.error('Get Recipe Error:', error);
    res.render('error', { message: 'Failed to load recipe.', currentUser: req.user || null });
  }
};

// ─── GET /recipes/:id/edit ───────────────────────────────────────────────────
const getEditRecipeForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.render('error', { message: 'Recipe not found.', currentUser: req.user });
    }

    // Only author or admin can edit
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).render('error', {
        message: '🚫 Access Denied: You can only edit your own recipes.',
        currentUser: req.user,
      });
    }

    const categories = [
      'Breakfast', 'Lunch', 'Dinner', 'Dessert',
      'Snack', 'Beverage', 'Soup', 'Salad', 'Appetizer', 'Other',
    ];

    res.render('recipeForm', {
      recipe,
      categories,
      error: null,
      currentUser: req.user,
    });
  } catch (error) {
    console.error('Get Edit Form Error:', error);
    res.render('error', { message: 'Failed to load edit form.', currentUser: req.user });
  }
};

// ─── POST /recipes/:id/edit ──────────────────────────────────────────────────
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.render('error', { message: 'Recipe not found.', currentUser: req.user });
    }

    // Only author or admin can update
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).render('error', {
        message: '🚫 Access Denied.',
        currentUser: req.user,
      });
    }

    const { title, description, ingredients, instructions, category, cookTime, servings, difficulty } =
      req.body;

    // If new image is uploaded, use it. Otherwise keep old one.
    const imagePath = req.file ? `/uploads/${req.file.filename}` : recipe.image;

    const ingredientsArr = Array.isArray(ingredients)
      ? ingredients.filter((i) => i.trim())
      : ingredients.split('\n').map((i) => i.trim()).filter(Boolean);

    await Recipe.findByIdAndUpdate(req.params.id, {
      title,
      description,
      ingredients: ingredientsArr,
      instructions,
      category,
      cookTime,
      servings,
      difficulty,
      image: imagePath,
    });

    res.redirect(`/recipes/${req.params.id}`);
  } catch (error) {
    console.error('Update Recipe Error:', error);
    res.render('error', { message: 'Failed to update recipe.', currentUser: req.user });
  }
};

// ─── POST /recipes/:id/delete ────────────────────────────────────────────────
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.render('error', { message: 'Recipe not found.', currentUser: req.user });
    }

    // Only author or admin can delete
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).render('error', {
        message: '🚫 Access Denied.',
        currentUser: req.user,
      });
    }

    // Delete all comments associated with this recipe
    await Comment.deleteMany({ recipe: req.params.id });

    // Remove recipe reference from user
    await User.findByIdAndUpdate(recipe.author, {
      $pull: { recipes: recipe._id },
    });

    await Recipe.findByIdAndDelete(req.params.id);

    res.redirect('/recipes/my');
  } catch (error) {
    console.error('Delete Recipe Error:', error);
    res.render('error', { message: 'Failed to delete recipe.', currentUser: req.user });
  }
};

module.exports = {
  getAllRecipes,
  getMyRecipes,
  getNewRecipeForm,
  createRecipe,
  getRecipe,
  getEditRecipeForm,
  updateRecipe,
  deleteRecipe,
};
