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

  // Internal CSS styles as JavaScript objects
  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa', // Light gray for a premium background
    paddingTop: '2rem',
    paddingBottom: '2rem',
  };

  const titleStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1.875rem', // Slightly larger for emphasis
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#1a2a6c', // Deep blue for professionalism
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '1.5rem', // Increased gap for elegance
    paddingLeft: '1rem',
    paddingRight: '1rem',
    '@media (min-width: 640px)': { // sm breakpoint
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '@media (min-width: 768px)': { // md breakpoint
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
    '@media (min-width: 1024px)': { // lg breakpoint
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    },
  };

  const loadingStyles = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    textAlign: 'center',
    color: '#666666', // Neutral gray for loading text
  };

  const errorStyles = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    textAlign: 'center',
    color: '#e53e3e', // Red for error message
  };

  if (loading) return <div style={loadingStyles}>Loading...</div>;
  if (error) return <div style={errorStyles}>{error}</div>;

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Now Showing</h1>
      <div style={gridStyles}>
        {shows.map(show => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}

export default Home;