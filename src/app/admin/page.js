"use client";

import { useState, useEffect } from "react";
import BlogForm from "../../components/admin_components/blogsForm";
import BlogList from "../../components/admin_components/blogList";

export default function AdminPage() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch blogs from your backend API
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/read`);
            const data = await response.json();
            setBlogs(data);
        };
        fetchBlogs();
    }, [blogs]); // Re-fetch when blogs change

    // Handle create/edit blog
    const handleSubmit = async (data) => {
        if (selectedBlog) {
            // Update blog
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, id: selectedBlog.id }),
            });
        } else {
            // Create new blog
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }
        setSelectedBlog(null);
        setIsFormVisible(false);
    };

    // Handle edit
    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setIsFormVisible(true);
    };

    // Handle delete
    const handleDelete = async (id) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/delete`, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

            <div>
                <button
                    onClick={() => {
                        setIsFormVisible(true);
                        setSelectedBlog(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Create New Blog
                </button>
            </div>

            {isFormVisible && <BlogForm onSubmit={handleSubmit} existingData={selectedBlog} />}

            <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}
