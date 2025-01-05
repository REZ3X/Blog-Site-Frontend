// components/BlogForm.js
import { useState } from "react";

export default function BlogForm({ onSubmit, existingData = {} }) {
    const [title, setTitle] = useState(existingData.title || "");
    const [content, setContent] = useState(existingData.content || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
                {existingData.id ? "Update Blog" : "Create Blog"}
            </button>
        </form>
    );
}
