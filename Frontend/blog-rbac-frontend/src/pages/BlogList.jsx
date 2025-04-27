
import React, { useEffect, useState } from 'react';
import { getBlogs } from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getBlogs();
        setBlogs(blogsData);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      <div>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="mb-4">
              <h3 className="text-xl">{blog.title}</h3>
              <p>{blog.content}</p>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
