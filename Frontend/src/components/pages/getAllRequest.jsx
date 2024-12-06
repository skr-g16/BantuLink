import { useEffect, useState } from 'react';
import { FaSpinner, FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaBox } from 'react-icons/fa'; // Import React Icons
import { APISource } from '../../data/source-api'; // Import API function
import { Link } from 'react-router-dom';

// Main Component
export const GetAllRequest = ({ isDarkMode }) => {
  const [requests, setRequests] = useState([]); // State to hold requests
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 70; // Panjang teks sebelum dipotong

  // Fetch requests data when the component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await APISource.getAllRequests(); // API call
        console.log('Fetched Data:', data);
        if (data && data.status === 'success') {
          setRequests(data.data.requests); // Update state with requests
        } else {
          setError('No data available'); // Handle unexpected response
        }
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false once the request is done
      }
    };

    fetchRequests();
  }, []); // Empty dependency array ensures this runs once when the component mounts
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`pt-20 min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-6xl p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>All Requests</h1>


        {loading ? (
          <div className="flex justify-center items-center space-x-3">
            <FaSpinner className="animate-spin text-gray-500 text-3xl" />
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 flex justify-center items-center space-x-2">
            <FaExclamationCircle className="text-red-600 text-3xl" />
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{error}</p>
          </div>
        ) : (
          <div>
            {requests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests.map((request) => (
                  <div key={request.id} className={`p-4 rounded-lg  shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
                    <h1 className="text-2xl mt-1"><span className="font-semibold">{request.disaster_name}</span></h1>

                    <h2 className="text-base font-medium">
                            {isExpanded || request.description.length <= maxDescriptionLength
                              ? request.description
                              : `${request.description.slice(0, maxDescriptionLength)}...`}
                          </h2>
                          {request.description.length > maxDescriptionLength && (
                            <button
                              onClick={toggleDescription}
                              className="mt-2 text-sm font-semibold text-blue-500 hover:underline focus:outline-none"
                            >
                              {isExpanded ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
                            </button>
                          )}                    
                    {/* Status Display Below H2 with Icons */}
                    <div className="flex items-center mt-2">
                      {request.request_status === 'Awaiting Donation' ? (
                        <FaExclamationCircle className="text-yellow-600 mr-2" />
                      ) : request.request_status === 'Completed' ? (
                        <FaCheckCircle className="text-green-600 mr-2" />
                      ) : request.request_status === 'Rejected' ? (
                        <FaTimesCircle className="text-red-600 mr-2" />
                      ) : (
                        <FaInfoCircle className="text-blue-600 mr-2" />
                      )}
                      <span className="text-sm font-medium">{request.request_status}</span>
                    </div>
                    <div className="mt-3 flex-grow">
                      <h3 className="text-lg font-medium">Items:</h3>
                      <ul className="space-y-2 mt-2">
                        {request.items.map((item , index) => (
                          <li key={index} className={`flex items-center justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <div className="flex items-center">
                            <FaBox className={`text-gray-600 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> {/* Icon for each item */}
                            <span>{item.description}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{item.quantity}</span>
                            <span className="font-semibold">{item.unit_name}</span>
                          </div>
                        </li>
                        
                        ))}
                      </ul>
                    </div>

                    {/* Link to detail page with request ID */}
                    <div className="mt-4 text-center">
                    <Link to={`/getDetailAllRequest/${request.id}`} className={`inline-block font-semibold py-2 px-4 rounded-lg transition duration-200 ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
  View Details
</Link>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No requests available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};