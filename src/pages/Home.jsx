import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ShowCard from '../components/ShowCard';

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const showsCollection = collection(db, 'shows');
        const showsSnapshot = await getDocs(showsCollection);
        const showsList = showsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date ? data.date.toDate().toLocaleDateString() : data.date,
            time: data.time || '',
          };
        });
        setShows(showsList);
      } catch (err) {
        setError('Failed to fetch shows. Please try again later.');
        console.error('Firestore error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-100 py-8 text-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-100 py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {shows.map(show => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}

export default Home;