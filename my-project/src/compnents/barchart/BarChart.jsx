
import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const chartContainer = useRef(null);

  useEffect(() => {
    expenditureStats(); // Fetch initial data when component mounts
  }, []);

  const expenditureStats = async (filter = null) => {
    try {
      const response = await fetch(`http://localhost:8000/v1/fetch-expenditure-stats?filter_name=${filter}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed (e.g., show error message)
    }
  };

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (chartContainer.current && chartData) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: 'bar',
        data: {
          labels: chartData.map(entry => entry.monthYear),
          datasets: [
            {
              label: 'Expenditure',
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
              hoverBorderColor: 'rgba(54, 162, 235, 1)',
              data: chartData.map(entry => parseFloat(entry.Expenditure)),
            },
            {
              label: 'Donation Received',
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
              hoverBorderColor: 'rgba(255, 99, 132, 1)',
              data: chartData.map(entry => parseFloat(entry.DonationReceived)),
            },
          ],
        },
        options: {
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }],
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterSelect = (filter) => {
    expenditureStats(filter); // Fetch data based on selected filter
    setDropdownOpen(false); // Close dropdown after selection
  };



  const handleButton = () => {
    // Open a new tab with the specified link
    window.open('https://form.jotform.com/241736519655061', '_blank');
  };

  return (
    <div className="relative bg-white shadow-md" id="statistics">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">Expenditure and Donation Received</h1>
        </div>
        <div className="relative">
          <div>
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Options
              <svg
                className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a
                  onClick={() => handleFilterSelect(null)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Yearly
                </a>
                <a
                  onClick={() => handleFilterSelect("past_3_months")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Past 3 Months
                </a>
                <a
                  onClick={() => handleFilterSelect("past_6_months")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Past 6 Months
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <canvas ref={chartContainer}></canvas>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-center">
        <button
        onClick={handleButton}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Request your personal data
        </button>
      </div>
    </div>
  );
};

export default BarChart;
