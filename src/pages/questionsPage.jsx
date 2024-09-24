import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [currentCompany, setCurrentCompany] = useState("");

  const handleFetchCsv = (fileName) => {
    let name = ""; // Declare the variable
    for (let index = 0; index < fileName.length; index++) {
      if (fileName[index] === '.') {
        break;
      }
      name += fileName[index];
    }
    setCurrentCompany(name);

    fetch(`/src/companies/${fileName}`) // Ensure this path is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      })
      .catch((error) => console.error('Error fetching CSV file:', error));
  };

  return (
    <div className='bg-custom-blue'>
      <h1 className='text-white font-montserrat'>Select a Company to View Interview Questions</h1>
      <div className='flex flex-col gap-5'>
        <div className='mncs flex gap-3  items-baseline'>
          <p>MNCs:</p>
          {/* Map buttons dynamically for cleaner code */}
          {['adobe', 'airbnb', 'amazon', 'atlassian', 'citadel', 'doordash', 'facebook', 'google', 'linkedin', 'netflix', 'nvidia', 'oracle', 'tiktok', 'uber', 'walmart-labs'].map(company => (
            <button key={company} onClick={() => handleFetchCsv(`${company}.csv`)} className='bg-custom-black p-2 text-white rounded-[10px]'>{company.charAt(0).toUpperCase() + company.slice(1)}</button>
          ))}
        </div>
        
        <div className='mass recruiters flex items-baseline gap-3'>
          <p className=''>Mass Recruiters:</p>
        {['accenture', 'capgemini', 'cognizant', 'atlassian', 'ibm', 'infosys', 'salesforce', 'yandex', 'zillow'].map(company => (
            <button key={company} onClick={() => handleFetchCsv(`${company}.csv`)} className='bg-custom-black p-2 text-white rounded-[10px]'>{company.charAt(0).toUpperCase() + company.slice(1)}</button>
          ))}
           <p>...more coming soon</p>
        </div>
       
      </div>

      {data.length > 0 && (
        <div className="mt-4">
          <h2>Data Table</h2>
          <h1 className='text-center text-[20px] font-poppins mb-2'>{currentCompany}</h1>
          <table className="table-auto border-collapse border border-gray-400 w-full border-none">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border border-gray-300 p-3">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="border border-gray-300 p-3">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvTable;
