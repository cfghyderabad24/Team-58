import React, { useState } from 'react';

const queryform = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e) => {
    if (e.target.value.split(' ').length <= 200) {
      setDescription(e.target.value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-8 text-center">Write Query</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the subject"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the description (max 200 words)"
              rows="5"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <p className="text-right text-sm text-gray-500">
              {description.split(' ').length} / 200 words
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default queryform;
