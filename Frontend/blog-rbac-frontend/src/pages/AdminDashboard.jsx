import { useState, useEffect } from "react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../services/api';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null); // Track which blog is being edited

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const response = await getBlogs(localStorage.getItem("token"));
      setBlogs(response);
    } catch (err) {
      setError("Failed to fetch blogs.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id, localStorage.getItem("token"));
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError("Failed to delete blog.");
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (editingBlogId) {
        // Updating blog
        const updatedBlog = { title, content };
        await updateBlog(editingBlogId, updatedBlog, localStorage.getItem("token"));
        setEditingBlogId(null); // Clear editing state
        fetchAllBlogs(); // Reload blogs
      } else {
        // Creating new blog
        const newBlog = { title, content };
        const response = await createBlog(newBlog, localStorage.getItem("token"));
        setBlogs([...blogs, response]);
      }
      setTitle(""); 
      setContent("");
    } catch (err) {
      setError(editingBlogId ? "Failed to update blog." : "Failed to create blog.");
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditingBlogId(blog._id);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setContent("");
    setEditingBlogId(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          {editingBlogId ? "Update Blog" : "Create a New Blog"}
        </h3>
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <textarea
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex gap-4">
          <button
            onClick={handleCreateOrUpdate}
            className="bg-green-500 text-white p-2 rounded-md w-full"
          >
            {editingBlogId ? "Update Blog" : "Create Blog"}
          </button>
          {editingBlogId && (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white p-2 rounded-md w-full"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Manage Blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Content</th>
              <th className="border px-4 py-2">Author ID</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.content}</td>
                <td className="border px-4 py-2">{blog.author?.name}</td>
                <td className="border px-4 py-2">
                  {new Date(blog.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-blue-500 text-white p-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;

