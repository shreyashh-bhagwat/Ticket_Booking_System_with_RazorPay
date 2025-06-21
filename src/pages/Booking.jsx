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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0F0C29] via-[#302B63] to-[#24243e] text-white">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0F0C29] via-[#302B63] to-[#24243e] text-red-400">
        <div className="text-xl font-semibold">Show not found.</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243e] font-sans text-white">
        <div className="w-full max-w-4xl p-8 md:p-12 rounded-3xl shadow-xl bg-white/5 backdrop-blur-lg border border-purple-500/20 animate-fadeIn transform transition duration-500 hover:scale-[1.01]">
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight text-white drop-shadow-md">
            🎟️ Book Tickets
          </h2>
          <p className="text-center text-lg text-purple-300 mb-6">
            {show.title} <span className="text-sm text-purple-200">({show.date} @ {show.time})</span>
          </p>

          {/* Image + SeatSelector */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <img
              src={show.image || 'https://via.placeholder.com/400x300'}
              alt={show.title}
              className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-lg border border-white/10"
            />
            <div className="w-full md:w-1/2">
              <SeatSelector showId={show.id} price={show.price} />
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out both;
          }
        `}
      </style>
    </>
  );
}

export default Booking;
