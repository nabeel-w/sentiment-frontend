/* eslint-disable */
import React from 'react';
import { Pie } from 'react-chartjs-2';

// Chart.js requires registering the chart types explicitly
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ data }) => {
  // Process the input data to calculate sentiment counts
  const sentimentCounts = data.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(sentimentCounts), // Sentiment types (e.g., Positive, Negative, Neutral)
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: Object.values(sentimentCounts), // Count of each sentiment type
        backgroundColor: [
          '#36A2EB', // Blue for Positive
          '#FF6384', // Red for Negative
          '#FFCE56', // Yellow for Neutral
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Sentiment Analysis Chart</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default SentimentChart;
