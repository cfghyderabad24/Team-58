import React, { useState, useEffect } from 'react';
import BarChart from '../barchart/BarChart';

function Home() {
  const [donatedUsers, setDonatedUsers] = useState([]);

  useEffect(() => {
    const fetchDonatedUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/v1/fetch-donated-users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDonatedUsers(data.recent_donations); // Assuming the API response structure has a 'users' array
      } catch (error) {
        console.error('Error fetching donated users:', error);
        // Handle error as needed (e.g., show error message)
      }
    };

    fetchDonatedUsers();
  }, []);

  return (
    <div>
      <div className='flex justify-center mb-8'>
        <img src="https://media.istockphoto.com/id/1141690680/photo/thirsty-child-drinking-water-on-water-pump.jpg?s=612x612&w=0&k=20&c=1yV5jEVZ4JcyB4Psztr5KXVjDcxIX9jml4AAeBpdzrY=" width="1500px" height="500px" alt="" />
      </div>

      {/* Cards Section */}
      <div className="container mx-auto ml-80 p-4 flex flex-col items-center" id="cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          

         <div className="text-center my-8 ">
          <div>
            <h1 className="text-3xl font-bold">Our Recent Contributers</h1>
          </div>
          <div className='flex justify-center mb-8'>
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl p-4">
              <ul className="divide-y divide-gray-200">
                {donatedUsers.map((user, index) => (
                  <li key={index} className="py-2">
                    <div>
                      <p className="text-gray-800">
                        <b>{user.company_name}</b> has donated an amount of <b>{user.donation_amount}</b>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>

      <BarChart className = "mt-20"/>
    </div>
  );
}

export default Home;