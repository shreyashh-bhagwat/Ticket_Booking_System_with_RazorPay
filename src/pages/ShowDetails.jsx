import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const showDoc = doc(db, 'shows', id);
        const showSnapshot = await getDoc(showDoc);
        if (showSnapshot.exists()) {
          const data = showSnapshot.data();
          setShow({
            id: showSnapshot.id,
            ...data,
            date: data.date?.toDate?.().toLocaleDateString() || '',
            time: data.time || '',
          });
        } else {
          console.error('Show not found');
        }
      } catch (error) {
        console.error('Error fetching show:', error);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'shows'));
        const shows = querySnapshot.docs
          .filter(doc => doc.id !== id)
          .slice(0, 4) // Limit to 4 suggestions
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setSuggested(shows);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchShow();
    fetchSuggestions();
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <>
      <style>{`
        .show-details-container {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: linear-gradient(to right, #1e1b4b, #312e81);
          padding: 2rem;
          color: white;
        }

        .details-box {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .details-box {
            flex-direction: row;
          }
        }

        .poster {
          width: 100%;
          max-width: 320px;
          object-fit: cover;
          border-radius: 20px 20px 0 0;
        }

        @media (min-width: 768px) {
          .poster {
            border-radius: 20px 0 0 20px;
          }
        }

        .info {
          padding: 2rem;
        }

        .info h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .info p {
          margin-bottom: 0.5rem;
          color: #d1d5db;
        }

        .info strong {
          color: #c4b5fd;
        }

        .price {
          font-size: 1.2rem;
          color: #34d399;
          margin-top: 1rem;
        }

        .book-btn {
          background: linear-gradient(to right, #8b5cf6, #7c3aed);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          color: white;
          margin-top: 1.5rem;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .book-btn:hover {
          transform: scale(1.05);
        }

        .section {
          margin-top: 2rem;
        }

        .section h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .suggested-shows {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        .suggested-card {
          background: rgba(255,255,255,0.08);
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          transition: transform 0.2s ease;
        }

        .suggested-card:hover {
          transform: translateY(-4px);
        }

        .suggested-card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .suggested-card h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }

        .meta-info {
          font-size: 0.9rem;
          color: #9ca3af;
        }

        .review-box {
          background: rgba(0,0,0,0.3);
          border-left: 4px solid #8b5cf6;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
      `}</style>

      <div className="show-details-container">
        <div className="details-box">
          <img src={show.poster} alt={show.title} className="poster" />
          <div className="info">
            <h2>{show.title}</h2>
            <p>{show.description}</p>
            <p><strong>Date:</strong> {show.date}</p>
            <p><strong>Time:</strong> {show.time}</p>
            <p><strong>Genre:</strong> {show.genre || 'Drama'}</p>
            <p><strong>Language:</strong> {show.language || 'English'}</p>
            <p className="price">Price: ₹{show.price}</p>
            <button className="book-btn" onClick={() => navigate(`/booking/${show.id}`)}>Book Seats</button>
          </div>
        </div>

        {/* Reviews */}
        <div className="section">
          <h3>Audience Reviews</h3>
          <div className="review-box">
            “An outstanding performance and great visual effects. Totally worth it!” – ⭐⭐⭐⭐☆
          </div>
          <div className="review-box">
            “The storyline was gripping from start to end. Highly recommend!” – ⭐⭐⭐⭐⭐
          </div>
        </div>

        {/* Suggestions */}
        <div className="section">
          <h3>More Shows You May Like</h3>
          <div className="suggested-shows">
            {suggested.map((s) => (
              <Link to={`/show/${s.id}`} key={s.id} className="suggested-card">
                <img src={s.poster} alt={s.title} />
                <h4>{s.title}</h4>
                <p className="meta-info">{s.genre || 'Genre'} | ₹{s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDetails;
