import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

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

    fetchShow();
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        .show-details-container {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: linear-gradient(to right, #f8f9fa, #e3e7eb);
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .details-box {
          background: white;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          max-width: 1000px;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 2rem;
        }

        @media (min-width: 768px) {
          .details-box {
            flex-direction: row;
          }
        }

        .poster {
          width: 100%;
          max-width: 300px;
          border-radius: 12px;
          object-fit: cover;
        }

        .info {
          padding: 1rem;
        }

        .info h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1a202c;
        }

        .info p {
          margin-bottom: 0.5rem;
          color: #555;
        }

        .info .price {
          font-size: 1.1rem;
          font-weight: 500;
          color: #4f46e5;
          margin-top: 0.75rem;
        }

        .book-btn {
          margin-top: 1.5rem;
          background: #4f46e5;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .book-btn:hover {
          background: #4338ca;
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
            <p className="price">Price: ₹{show.price}</p>
            <button className="book-btn" onClick={() => navigate(`/booking/${show.id}`)}>
              Book Seats
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDetails;
