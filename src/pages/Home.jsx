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
        const showsList = showsSnapshot.docs.map((doc) => {
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

  return (
    <>
      {/* Internal CSS styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          .home-container {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            background-color: #f4f6fb;
            padding: 2rem 1rem;
          }

          .banner {
            width: 100%;
            max-height: 280px;
            overflow: hidden;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }

          .banner img {
            width: 100%;
            height: auto;
            object-fit: cover;
            display: block;
          }

          .home-title {
            text-align: center;
            font-size: 2rem;
            font-weight: 700;
            color: #1a2a6c;
            margin-bottom: 2rem;
          }

          .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }

          .loading,
          .error {
            text-align: center;
            padding: 4rem 2rem;
            color: #666;
            font-size: 1.2rem;
          }

          .error {
            color: #e53e3e;
          }
        `}
      </style>

      <div className="home-container">
        {/* Banner Image / Slider */}
        <div className="banner">
          <img
            src="https://149512919.v2.pressablecdn.com/wp-content/uploads/2021/12/philly-movies-hero-banner.jpg"
            alt="Banner Advertisement"
          />
        </div>

        <h1 className="home-title">Now Showing</h1>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="card-grid">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
