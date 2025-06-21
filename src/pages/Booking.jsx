import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import SeatSelector from '../components/SeatSelector';

function Booking() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

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
            price: data.price || 1,
          });
        } else {
          console.error('Show not found');
        }
      } catch (error) {
        console.error('Error fetching show:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!show) return <div>Show not found.</div>;

  return (
    <>
      {/* Internal CSS for modern UI */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

          .booking-container {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            background: linear-gradient(to right, #eef2f3, #cfd9df);
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .booking-box {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 100%;
            max-width: 800px;
          }

          .booking-title {
            font-size: 2rem;
            font-weight: 600;
            color: #1a202c;
            text-align: center;
            margin-bottom: 1.5rem;
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div className="booking-container">
        <div className="booking-box">
          <h2 className="booking-title">
            Book Tickets for: {show.title} ({show.date} @ {show.time})
          </h2>
          <SeatSelector showId={show.id} price={show.price} />
        </div>
      </div>
    </>
  );
}

export default Booking;
