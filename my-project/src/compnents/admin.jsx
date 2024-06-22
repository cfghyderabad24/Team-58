import React, { useState } from 'react';
// import ToDoList from './ToDoList';

const Admin = () => {
  const [section, setSection] = useState('fetch');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
          <img 
            src="http://jaldhaara.org/wp-content/uploads/2022/04/jaldhaara-logo.png" 
            className="mx-auto" 
            alt="Jaldhaara" 
            style={{ width: '300px', height: 'auto' }} // Adjust the size here
          />
          </div>
          <div className="flex justify-center space-x-4 py-2">
            <button onClick={() => setSection('fetch')} className="px-4 py-2 bg-blue-500 text-white rounded">Donors</button>
            <button onClick={() => setSection('feed')} className="px-4 py-2 bg-green-500 text-white rounded">Feed</button>
            <button onClick={() => setSection('tasks')} className="px-4 py-2 bg-yellow-500 text-white rounded">My Task</button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {section === 'fetch' && <FetchSection />}
        {section === 'feed' && <FeedSection />}
        {section === 'tasks' && <TasksSection />}
      </main>
    </div>
  );
};

const FetchSection = () => (
    <div>
       <h2 className="text-2xl font-bold mb-4">Fetch Section</h2>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <ul className="list-decimal list-inside">
            <li className="py-1">1</li>
            <li className="py-1">2</li>
            <li className="py-1">3</li>
            <li className="py-1">4</li>
          </ul>
        </div>
        <div className="w-1/3 pl-4">
          <div className="p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold mb-2">Filter</h3>
            <div>
              <input type="checkbox" id="filter1" className="mr-2" />
              <label htmlFor="filter1">Filter 1</label>
            </div>
            <div>
              <input type="checkbox" id="filter2" className="mr-2" />
              <label htmlFor="filter2">Filter 2</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const FeedSection = () =>  {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        contactNumber: '',
        donationAmount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., submit to server or perform validation)
        console.log(formData);
        // Reset form after submission if needed
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            contactNumber: '',
            donationAmount: '',
        });
    };
    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Donation Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="input-field" required />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="input-field" required />
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="input-field" required />
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="input-field" />
                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" className="input-field" />
                <input type="number" name="donationAmount" value={formData.donationAmount} onChange={handleChange} placeholder="Donation Amount" className="input-field" required />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};


  
  const TasksSection = () => {
      const [tasks, setTasks] = useState([]);
      const [newTask, setNewTask] = useState('');
    
      const addTask = () => {
        if (newTask.trim()) {
          setTasks([...tasks, { text: newTask, statuses: [false, false, false] }]);
          setNewTask('');
        }
      };
    
      const toggleTaskStatus = (taskIndex, statusIndex) => {
        const updatedTasks = tasks.map((task, i) =>
          i === taskIndex
            ? { ...task, statuses: task.statuses.map((status, j) => (j === statusIndex ? !status : status)) }
            : task
        );
        setTasks(updatedTasks);
      };
      const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
      };
    
      return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Shortlisted Companies</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm inputele"
              placeholder="New company..."
              />
              <button
                onClick={addTask}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Add
              </button>
            </div>
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="flex items-center justify-between mb-2 p-2 border-b text-sm">
<div className="flex-grow">
                  <span className={task.statuses[1] ? 'line-through' : ''}>{task.text}</span>
                </div>
                <div className="flex items-center ml-4 space-x-4">
                  {['Contacted', 'Interested', 'Email_Sent  '].map((label, statusIndex) => (
                    <label key={statusIndex} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.statuses[statusIndex]}
                        onChange={() => toggleTaskStatus(index, statusIndex)}
                        className="mr-1"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                  <button
                    onClick={() => removeTask(index)}
                    className="ml-2 px-1 py-0.5 bg-red-500 text-white rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
  };




export default Admin;  