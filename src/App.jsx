import { useState } from 'react'
import ChartComponent from './components/ChartComponent'

function App() {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a CSV file to upload');
      return;
    }
    // Create a FormData object to include the file
    const formData = new FormData();
    formData.append('file', file);

    // Use fetch to POST the file to the endpoint
    fetch('http://127.0.0.1:8000/analyze-csv/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log('Response from server:', data); // Log the response
        setData(data); // Set the response data using setData
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        alert("Error uploading file")
      });
  };

  return (
    <div className="container">
      <div>
        <h2>Upload CSV File</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="csvFile">Choose a CSV file:</label>
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
      {data && (
        <div className="chart-container">
          <ChartComponent data={data.results} />
        </div>
      )}
    </div>

  );
}

export default App
