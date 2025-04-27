const express = require('express');
const { createBlog, getAllBlogs, deleteBlog, updateBlog} = require('../controllers/blogController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('admin'), createBlog);
router.get('/', authenticateToken, getAllBlogs);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteBlog);

router.put('/:id', authenticateToken, authorizeRole('admin'),updateBlog);

module.exports = router;
