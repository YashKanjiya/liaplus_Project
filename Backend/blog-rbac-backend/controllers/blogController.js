const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({ title, content, author: req.user.id });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true } // Return the updated blog instead of old one
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

