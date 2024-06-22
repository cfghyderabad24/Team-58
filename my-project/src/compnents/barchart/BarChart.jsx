import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    let newChartInstance = null;

    // Ensure previous chart instance is destroyed before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Create new chart instance
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Store newChartInstance in state
      setChartInstance(newChartInstance);
    }

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
