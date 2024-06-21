// components/PostCard.jsx
import React from 'react';
import { FaTrash, FaEdit, FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';

const PostCard = ({ post, handleDelete, handleEdit, handleLike, liked, likedBy }) => {
  return (
    <div className="bg-secondary p-4 rounded mb-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold mb-2">{post.postedBy.name}</h3>
        <div className="flex justify-end space-x-2">
          <button
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            onClick={() => handleDelete(post)}
          >
            <FaTrash className="mr-1" />
          </button>
        </div>
      </div>
      <p className="mt-2 mb-4">{post.content}</p>
      <div className="grid grid-cols-3 items-center gap-5">
        <button
          className={`text-md flex items-center gap-3 px-4 py-2 rounded
            ${liked ? 'bg-red-500 text-white hover:bg-gray-300 hover:text-gray-800' : 'bg-gray-300 text-gray-800 hover:bg-red-500 hover:text-white'}
          `}
          onClick={handleLike}
        >
          {liked ? <FaHeart /> : <FaRegHeart />} {likedBy.length}
        </button>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => handleEdit(post)}
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button 
          className='text-md flex items-center px-4 py-2 bg-slate-200 text-red-500 rounded shadow hover:bg-red-500 hover:text-white'>
          <FaComment className="mr-1" /> Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
