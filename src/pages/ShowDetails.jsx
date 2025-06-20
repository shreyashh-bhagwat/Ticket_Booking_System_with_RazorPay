import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

  useEffect(() => {
    // Sample static data (replace with Firestore fetch)
    const sampleShow = {
      id: id,
      title: `Movie ${id}`,
      description: 'Detailed description of the movie.',
      poster: 'https://via.placeholder.com/300x450',
      date: '2025-06-25',
      time: '18:00',
      price: 1,
    };
    setShow(sampleShow);

    // Uncomment to fetch from Firestore
    /*
    const fetchShow = async () => {
      const showDoc = doc(db, 'shows', id);
      const showSnapshot = await getDoc(showDoc);
      if (showSnapshot.exists()) {
        setShow({ id: showSnapshot.id, ...showSnapshot.data() });
      }
    };
    fetchShow();
    */
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row">
          <img src={show.poster} alt={show.title} className="w-full md:w-1/3 h-96 object-cover rounded-lg" />
          <div className="md:ml-6 mt-4 md:mt-0">
            <h2 className="text-2xl font-bold">{show.title}</h2>
            <p className="text-gray-600 mt-2">{show.description}</p>
            <p className="text-gray-500 mt-2">Date: {show.date}</p>
            <p className="text-gray-500">Time: {show.time}</p>
            <p className="text-gray-500">Price: ₹{show.price}</p>
            <button
              onClick={() => navigate(`/booking/${show.id}`)}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Book Seats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;