const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get('/', [
  query('includeInactive')
    .optional()
    .isBoolean()
    .withMessage('includeInactive must be a boolean')
], async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    
    // Build query
    let query = {};
    if (!includeInactive) {
      query.isActive = true;
    }

    const categories = await Category.find(query)
      .populate('parentCategory', 'name slug')
      .populate('subcategories', 'name slug')
      .sort({ sortOrder: 1, name: 1 });

    res.json({
      status: 'success',
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Get category tree structure
// @route   GET /api/categories/tree
// @access  Public
router.get('/tree', async (req, res) => {
  try {
    // Get all active categories
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 });

    // Build tree structure
    const categoryTree = [];
    const categoryMap = new Map();

    // First pass: Create map of all categories
    categories.forEach(category => {
      categoryMap.set(category._id.toString(), {
        ...category.toObject(),
        children: []
      });
    });

    // Second pass: Build tree structure
    categories.forEach(category => {
      const categoryObj = categoryMap.get(category._id.toString());
      
      if (category.parentCategory) {
        const parent = categoryMap.get(category.parentCategory.toString());
        if (parent) {
          parent.children.push(categoryObj);
        }
      } else {
        categoryTree.push(categoryObj);
      }
    });

    res.json({
      status: 'success',
      data: { categories: categoryTree }
    });

  } catch (error) {
    console.error('Get category tree error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parentCategory', 'name slug')
      .populate('subcategories', 'name slug description image');
    
    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    // Get products count for this category
    const productCount = await Product.countDocuments({ 
      category: category._id,
      isActive: true 
    });

    res.json({
      status: 'success',
      data: { 
        category: {
          ...category.toObject(),
          productCount
        }
      }
    });

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
router.post('/', [auth, admin, upload.single('image')], [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('parentCategory')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid parent category ID'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, parentCategory } = req.body;

    // Check if category name already exists
    const existingCategory = await Category.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existingCategory) {
      return res.status(400).json({
        status: 'error',
        message: 'Category with this name already exists'
      });
    }

    // Check if parent category exists (if provided)
    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        return res.status(400).json({
          status: 'error',
          message: 'Parent category not found'
        });
      }
    }

    const body = req.body
    if (req.file && req.file.filename) {
      const baseUrl = `${req.protocol}://${req.get('host')}`
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`
      body.image = { url: imageUrl }
    }

    // Create category
    const category = new Category(body);
    await category.save();

    // If this is a subcategory, add it to parent's subcategories array
    if (parentCategory) {
      await Category.findByIdAndUpdate(
        parentCategory,
        { $push: { subcategories: category._id } }
      );
    }

    // Populate the response
    await category.populate('parentCategory', 'name slug');

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: { category }
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
router.put('/:id', [auth, admin, upload.single('image')], [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('parentCategory')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid parent category ID'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, parentCategory } = req.body;

    // Find category
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    // Check if name already exists (if updating name)
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ 
        name: new RegExp(`^${name}$`, 'i'),
        _id: { $ne: req.params.id }
      });
      if (existingCategory) {
        return res.status(400).json({
          status: 'error',
          message: 'Category with this name already exists'
        });
      }
    }

    // Check if parent category exists (if updating parent)
    if (parentCategory && parentCategory !== category.parentCategory?.toString()) {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        return res.status(400).json({
          status: 'error',
          message: 'Parent category not found'
        });
      }

      // Prevent circular reference
      if (parentCategory === req.params.id) {
        return res.status(400).json({
          status: 'error',
          message: 'A category cannot be its own parent'
        });
      }
    }

    // Update category
    const updateData = { ...req.body }
    if (req.file && req.file.filename) {
      const baseUrl = `${req.protocol}://${req.get('host')}`
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`
      updateData.image = { url: imageUrl }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('parentCategory', 'name slug').populate('subcategories', 'name slug');

    res.json({
      status: 'success',
      message: 'Category updated successfully',
      data: { category: updatedCategory }
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Cannot delete category. It has ${productCount} product(s) associated with it.`
      });
    }

    // Check if category has subcategories
    const subcategoryCount = await Category.countDocuments({ parentCategory: req.params.id });
    if (subcategoryCount > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Cannot delete category. It has ${subcategoryCount} subcategory(ies).`
      });
    }

    // Remove from parent's subcategories array if it has a parent
    if (category.parentCategory) {
      await Category.findByIdAndUpdate(
        category.parentCategory,
        { $pull: { subcategories: req.params.id } }
      );
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Get categories with product counts
// @route   GET /api/categories/with-counts
// @access  Public
router.get('/with-counts', async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $addFields: {
          productCount: {
            $size: {
              $filter: {
                input: '$products',
                as: 'product',
                cond: { $eq: ['$$product.isActive', true] }
              }
            }
          }
        }
      },
      {
        $project: {
          products: 0
        }
      },
      {
        $sort: { sortOrder: 1, name: 1 }
      }
    ]);

    res.json({
      status: 'success',
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories with counts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;