import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Adminlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Ensure this is correctly used

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password
    };

    try {
      console.log("Stringified data: " + JSON.stringify(data))
      const response = await fetch("http://localhost:8000/v1/login", {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result); // Debugging line
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("token_type", result.token_type);
        // navigate('/'); // Redirect to home page
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
        // Handle login failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other unexpected errors
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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

export default Adminlogin;
