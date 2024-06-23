import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [section, setSection] = useState('fetch');
  const [donors, setDonors] = useState([]);
  const [developmentSectors, setDevelopmentSectors] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [modesOfImplementation, setModesOfImplementation] = useState([]);

  useEffect(() => {
    const fetchDevelopmentSectors = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/v1/fetch-filters?filter_name=Development Sector(s)`);
        const data = await response.json();
        setDevelopmentSectors(data.details.filters);
      } catch (error) {
        console.error('Error fetching Development Sectors:', error);
        setDevelopmentSectors([]);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/v1/fetch-filters?filter_name=State`);
        const data = await response.json();
        setStates(data.details.filters);
      } catch (error) {
        console.error('Error fetching States:', error);
        setStates([]);
      }
    };

    const fetchDistricts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/v1/fetch-filters?filter_name=District`);
        const data = await response.json();
        setDistricts(data.details.filters);
      } catch (error) {
        console.error('Error fetching Districts:', error);
        setDistricts([]);
      }
    };

    const fetchModesOfImplementation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/v1/fetch-filters?filter_name=Mode of Implementation`);
        const data = await response.json();
        setModesOfImplementation(data.details.filters);
      } catch (error) {
        console.error('Error fetching Modes of Implementation:', error);
        setModesOfImplementation([]);
      }
    };

    // Fetch all filters when the component mounts
    fetchDevelopmentSectors();
    fetchStates();
    fetchDistricts();
    fetchModesOfImplementation();
  }, []);

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



const FetchSection = () => {
  const [query, setQuery] = useState('');
  const [donors, setDonors] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/v1/fetch-donors?query=${query}`);
      const data = await response.json();
      setDonors(data.data.events); // Assuming 'events' is the array of donors based on your backend response
    } catch (error) {
      console.error('Error fetching donors:', error);
      setDonors([]); // Reset donors state in case of error
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Fetch Section</h2>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <form onSubmit={handleSearch}>
            <input 
              type="text"
              placeholder="Search"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="grid grid-cols-1 gap-4">
            {donors.length > 0 ? donors.map((donor, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded shadow">
                <h3 className="text-lg font-semibold">{donor.Company}</h3>
                <p className="text-sm text-gray-600">{donor.State}, {donor.District}</p>
                {donor["CSR Project(s)"] && (
                  <p className="text-sm"><strong>CSR Project:</strong> {donor["CSR Project(s)"]}</p>
                )}
                {donor["Development Sector(s)"] && (
                  <p className="text-sm"><strong>Development Sector:</strong> {donor["Development Sector(s)"]}</p>
                )}
                {donor["Mode of Implementation"] && (
                  <p className="text-sm"><strong>Mode of Implementation:</strong> {donor["Mode of Implementation"]}</p>
                )}
                <p className="text-sm"><strong>Year:</strong> {donor.Year}</p>
              </div>
            )) : (
              <p className="py-1">No donors found</p>
            )}
          </div>
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
};




const FeedSection = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here (e.g., send data to server)

    // Clear form fields after submission if needed
    setFirstName('');
    setLastName('');
    setCompanyName('');
    setEmail('');
    setPhoneNumber('');
    setDonationAmount('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Feed Section</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className=" text-gray-700 font-bold mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Company Name</label>
          <input
            type="text"
            id="companyName"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="donationAmount" className="block text-gray-700 font-bold mb-2">Donation Amount</label>
          <input
            type="text"
            id="donationAmount"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter donation amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
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
          className="w-full px-2 py-1 border rounded text-sm"
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
              {['Contacted', 'Interested', 'Email Sent'].map((label, statusIndex) => (
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

export default Admin;
