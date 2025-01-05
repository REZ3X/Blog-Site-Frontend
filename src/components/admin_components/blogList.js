// components/BlogList.js
export default function BlogList({ blogs, onEdit, onDelete }) {
    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <div key={blog.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                    <div>
                        <h3 className="text-xl font-semibold">{blog.title}</h3>
                        <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => onEdit(blog)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(blog.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
