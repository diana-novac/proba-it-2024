const express = require('express');
const Recipe = require('../models/Recipe');
const authMiddleware = require('./middleware');
const User = require('../models/User');

const router = express.Router();

function hasUserVoted(recipe, userId) {
    for (let i = 0; i < recipe.ratings.length; i++) {
        if (recipe.ratings[i].user.toString() === userId.toString()) {
            return true;
        }
    }
    return false;
}

function calculateAverageRating(recipe) {
    let sum = 0;
    for (let i = 0; i < recipe.ratings.length; i++) {
        sum += recipe.ratings[i].rating;
    }
    return sum / recipe.ratings.length;
}

router.post('/add-recipe', authMiddleware, async (req, res) => {
    const {name, description, image} = req.body;

    if (!name || !description) {
        return res.status(400).json({message : 'Name and description are required.'});
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message : 'User not found'});
        }

        const newRecipe = new Recipe({
            name: name,
            description: description,
            image: image || '',
            author: user._id,
            ratings: [],
            averageRating: 0
        });

        await newRecipe.save();

        res.status(201).json({message : 'Recipe added successfully!', recipe: newRecipe});
    } catch (err) {
        res.status(500).json({message: 'Add recipe failed.', error: err});
    }
});

router.get('/all-recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('author', 'username fullName');

        res.status(200).json({message: 'Recipes fetched successfully!', recipes});
    } catch (err) {
        res.status(500).json({message: 'Failed to fetch recipes', error : err});
    }
});


router.post('/rate-recipe/:id', authMiddleware, async (req, res) => {
    const {rating} = req.body;
    const recipeId = req.params.id;

    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({message : 'Recipe not found'});
        }

        if (hasUserVoted(recipe, req.userId)) {
            return res.status(400).json({message : 'You have already rated this recipe!'});
        }

        recipe.ratings.push({user : req.userId, rating});

        const avg = calculateAverageRating(recipe);
        recipe.averageRating = avg;

        await recipe.save();

        res.status(200).json({message : 'Rating added successfully'});
    } catch (err) {
        res.status(500).json({message : 'Failed to rate recipe', error: err});
    }
});

router.delete('/delete-recipe/:id', authMiddleware, async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({message : 'Recipe not found'});
        }

        if (recipe.author.toString() !== req.userId.toString()) {
            return res.status(403).json({message : 'You can only delete your own recipes!'});
        }

        await Recipe.deleteOne({ _id: recipeId });

        res.status(200).json({message : 'Recipe deleted successfully'});
    } catch (err) {
        res.status(500).json({message : 'Failed to delete recipe', error : err});
    }
});

router.get('/top-recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ averageRating : -1}).limit(3);

        if (!recipes) {
            return res.status(404).json({message : 'Recipes not found'});
        }

        res.status(200).json({message : 'Top 3 recipes fetched successfully!', recipes});
    } catch (err) {
        res.status(500).json({message : 'Failed to fetch top 3 recipes', error : err});
    }
});

module.exports = router;
