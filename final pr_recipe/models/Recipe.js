const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Recipe description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
    },
    category: {
      type: String,
      enum: [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Dessert',
        'Snack',
        'Beverage',
        'Soup',
        'Salad',
        'Appetizer',
        'Other',
      ],
      default: 'Other',
    },
    cookTime: {
      type: Number, // in minutes
      default: 30,
    },
    servings: {
      type: Number,
      default: 4,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    image: {
      type: String,
      default: '',
    },
    // Reference to the user who created this recipe
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // References to comments on this recipe
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Text index for search
recipeSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
