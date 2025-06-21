import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ShowCard from '../components/ShowCard';

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery] = useState('');

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

  // Filter shows by category and search
  const categories = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi'];
  const filteredShows = shows
    .filter(show =>
      show.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(show => selectedCategory === 'All' || show.category === selectedCategory);

  // Get a featured show (first show with an image for simplicity)
  const featuredShow = shows.find(show => show.image) || shows[0];

  // Mock top-rated shows (replace with real data if available)
  const topRatedShows = filteredShows.slice(0, 3).map(show => ({
    ...show,
    rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
  }));

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>
      {/* CDN for Tailwind CSS */}
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />

      {/* Navbar with Enhanced Search */}
      

      {/* Hero Banner with Gradient Overlay */}
      <section className="relative text-white">
        <div className="absolute inset-0" style={{ 
          backdropFilter: 'blur(10px)', 
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(107, 70, 193, 0.2))',
          borderBottom: '1px solid rgba(107, 70, 193, 0.3)' 
        }}></div>
        <img
          src="https://149512919.v2.pressablecdn.com/wp-content/uploads/2021/12/philly-movies-hero-banner.jpg"
          alt="Hero Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ 
            color: '#FFFFFF', 
            textShadow: '0 2px 8px rgba(107, 70, 193, 0.5)' 
          }}>
            Discover the Best Shows
          </h1>
          <button
            className="py-3 px-8 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ 
              background: 'linear-gradient(45deg, #6B46C1, #805AD5)', 
              color: '#FFFFFF', 
              boxShadow: '0 4px 12px rgba(107, 70, 193, 0.5)' 
            }}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Category Filter with Glass Effect */}
      <section className="py-10 px-4 md:px-8" style={{ 
        backdropFilter: 'blur(12px)', 
        background: 'linear-gradient(90deg, rgba(26, 32, 44, 0.8), rgba(44, 36, 64, 0.8))',
        borderTop: '1px solid rgba(107, 70, 193, 0.3)', 
        borderBottom: '1px solid rgba(107, 70, 193, 0.3)' 
      }}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md ${
                selectedCategory === category ? 'ring-2 ring-purple-500' : ''
              }`}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(45deg, #6B46C1, #805AD5)' 
                  : 'rgba(74, 85, 104, 0.4)',
                color: '#FFFFFF',
                boxShadow: selectedCategory === category 
                  ? '0 3px 8px rgba(107, 70, 193, 0.4)' 
                  : '0 2px 5px rgba(0, 0, 0, 0.2)',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Show with Glass Card */}
      {featuredShow && (
        <section className="py-12 px-4 md:px-8" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight" style={{ 
              color: '#6B46C1', 
              textShadow: '0 2px 8px rgba(107, 70, 193, 0.3)' 
            }}>
              Featured Show
            </h2>
            <div className="flex flex-col md:flex-row items-center rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] backdrop-blur-lg" style={{ 
              background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.7), rgba(44, 36, 64, 0.7))', 
              boxShadow: '0 10px 20px rgba(107, 70, 193, 0.2)' 
            }}>
              <img
                src={featuredShow.image || 'https://via.placeholder.com/400x300'}
                alt={featuredShow.title}
                className="w-full md:w-1/3 h-64 object-cover rounded-l-2xl"
              />
              <div className="p-6 flex-1">
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>{featuredShow.title}</h3>
                <p className="text-lg mb-4" style={{ color: '#A0AEC0' }}>{featuredShow.description || 'An exciting show you don’t want to miss!'}</p>
                <p className="text-md mb-4" style={{ color: '#A0AEC0' }}>Date: {featuredShow.date} | Time: {featuredShow.time}</p>
                <button
                  className="py-2 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(45deg, #6B46C1, #805AD5)', 
                    color: '#FFFFFF', 
                    boxShadow: '0 3px 8px rgba(107, 70, 193, 0.4)' 
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Rated Shows with Glass Cards */}
      <section className="py-12 px-4 md:px-8" style={{ backgroundColor: '#0A0A0A' }}>
        <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight" style={{ 
          color: '#6B46C1', 
          textShadow: '0 2px 8px rgba(107, 70, 193, 0.3)' 
        }}>
          Top Rated Shows
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topRatedShows.map((show) => (
            <div 
              key={show.id} 
              className="p-6 rounded-2xl transform transition-all duration-300 hover:scale-[1.02] backdrop-blur-lg" 
              style={{ 
                background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.7), rgba(44, 36, 64, 0.7))', 
                boxShadow: '0 8px 15px rgba(107, 70, 193, 0.2)' 
              }}
            >
              <img 
                src={show.image || 'https://via.placeholder.com/300x200'} 
                alt={show.title} 
                className="w-full h-48 object-cover rounded-2xl" 
              />
              <h3 className="text-2xl font-semibold mt-4" style={{ color: '#FFFFFF' }}>{show.title}</h3>
              <p className="text-lg mt-2" style={{ color: '#A0AEC0' }}>Rating: {show.rating}/5</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shows Grid with Glass Cards */}
      <section className="py-12 px-4 md:px-8" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight" style={{ 
            color: '#6B46C1', 
            textShadow: '0 2px 8px rgba(107, 70, 193, 0.3)' 
          }}>
            Now Showing
          </h2>
          {loading ? (
            <div className="text-center text-lg py-12" style={{ color: '#A0AEC0' }}>Loading...</div>
          ) : error ? (
            <div className="text-center text-lg py-12" style={{ color: '#F56565' }}>{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredShows.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  style={{ 
                    backdropFilter: 'blur(12px)', 
                    background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.7), rgba(44, 36, 64, 0.7))', 
                    boxShadow: '0 8px 15px rgba(107, 70, 193, 0.2)', 
                    padding: '1.5rem', 
                    borderRadius: '1rem',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  className="transform hover:scale-[1.02]"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer with Glass Effect */}
      <footer className="py-12 px-4" style={{ 
        backdropFilter: 'blur(12px)', 
        background: 'linear-gradient(90deg, rgba(26, 32, 44, 0.9), rgba(44, 36, 64, 0.9))',
        borderTop: '1px solid rgba(107, 70, 193, 0.3)' 
      }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#6B46C1' }}>About Us</h3>
            <p className="text-lg" style={{ color: '#A0AEC0' }}>
              Your go-to platform for discovering and booking the best shows and movies in town. Experience entertainment like never before!
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#6B46C1' }}>Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white transition duration-300 text-lg" style={{ color: '#A0AEC0' }}>About</a></li>
              <li><a href="/contact" className="hover:text-white transition duration-300 text-lg" style={{ color: '#A0AEC0' }}>Contact</a></li>
              <li><a href="/privacy" className="hover:text-white transition duration-300 text-lg" style={{ color: '#A0AEC0' }}>Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition duration-300 text-lg" style={{ color: '#A0AEC0' }}>Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#6B46C1' }}>Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white hover:scale-110 transition duration-300 text-lg" style={{ color: '#A0AEC0' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96 5.5 0 9.96-4.46 9.96-9.96 0-5.5-4.46-9.96-9.96-9.96zm0 18.92c-4.95 0-8.96-4.01-8.96-8.96s4.01-8.96 8.96-8.96 8.96 4.01 8.96 8.96-4.01 8.96-8.96 8.96zm4.63-6.75l-3.88 2.24c-.17.1-.38.1-.55 0l-3.88-2.24c-.36-.21-.58-.62-.58-1.05v-4.48c0-.43.22-.84.58-1.05.36-.21.81-.21 1.17 0l3.88 2.24c.17.1.38.1.55 0l3.88-2.24c.36-.21.81-.21 1.17 0 .36.21.58.62.58 1.05v4.48c0 .43-.22.84-.58 1.05z" /></svg>
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition duration-300 text-lg" style={{ color: '#A0AEC0' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.88 8.15 6.84 9.44.5.09.68-.22.68-.48v-1.69c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.92-.62.07-.61.07-.61 1.02.07 1.56 1.05 1.56 1.05.91 1.56 2.38 1.11 2.97.85.09-.66.35-1.11.64-1.36-2.24-.25-4.59-1.12-4.59-4.98 0-1.1.39-2 .99-2.7-.1-.25-.43-1.28.09-2.67 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.52 1.39.19 2.42.09 2.67.6.7.99 1.6.99 2.7 0 3.87-2.36 4.73-4.61 4.98.36.31.67.92.67 1.85v2.74c0 .27.18.58.69.48 3.96-1.29 6.84-5.03 6.84-9.44 0-5.5-4.46-9.96-9.96-9.96z" /></svg>
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition duration-300 text-lg" style={{ color: '#A0AEC0' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96 5.5 0 9.96-4.46 9.96-9.96 0-5.5-4.46-9.96-9.96-9.96zm0 18.92c-4.95 0-8.96-4.01-8.96-8.96s4.01-8.96 8.96-8.96 8.96 4.01 8.96 8.96-4.01 8.96-8.96 8.96zm-3.28-5.76c.39 0 .71-.32.71-.71v-3.82c0-.39-.32-.71-.71-.71h-.01c-.39 0-.71.32-.71.71v3.82c0 .39.32.71.71.71zm3.28 0c.39 0 .71-.32.71-.71v-3.82c0-.39-.32-.71-.71-.71s-.71.32-.71.71v3.82c0 .39.32.71.71.71zm3.28 0c.39 0 .71-.32.71-.71v-3.82c0-.39-.32-.71-.71-.71s-.71.32-.71.71v3.82c0 .39.32.71.71.71z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-lg" style={{ color: '#A0AEC0' }}>
          © {new Date().getFullYear()} ShowTime. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;