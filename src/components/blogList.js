// components/BlogList.js
import { useState, useEffect } from "react";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [expandedBlogId, setExpandedBlogId] = useState(null);

    // Fetch blogs from the API
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/read`);
            const data = await response.json();
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

    // Toggle blog visibility (expand/collapse)
    const handleToggle = (id) => {
        if (expandedBlogId === id) {
            setExpandedBlogId(null); // Collapse if the same blog is clicked
        } else {
            setExpandedBlogId(id); // Expand the clicked blog
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Blog List</h2>
            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div key={blog.id} className="border p-4 rounded-md shadow-lg">
                        <div
                            onClick={() => handleToggle(blog.id)}
                            className="cursor-pointer text-xl font-medium text-blue-600 hover:underline"
                        >
                            {blog.title}
                        </div>
                        {expandedBlogId === blog.id && (
                            <div className="mt-2 text-gray-700">
                                <p>{blog.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
