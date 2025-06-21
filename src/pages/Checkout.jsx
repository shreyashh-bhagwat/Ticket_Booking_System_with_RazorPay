import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const showDoc = doc(db, 'shows', id);
        const showSnapshot = await getDoc(showDoc);
        if (showSnapshot.exists()) {
          const data = showSnapshot.data();
          const seats = location.state?.selectedSeats || [];
          const price = data.price || 1;

          setShow({
            id: showSnapshot.id,
            ...data,
            price,
            date: data.date?.toDate?.().toLocaleDateString() || '',
            time: data.time || '',
          });

          setSelectedSeats(seats);
          setTotalPrice(seats.length * price);
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
  }, [id, location.state]);

  const handlePayment = () => {
    const amountInPaise = Math.round(totalPrice * 100);

    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      alert('Invalid payment amount');
      return;
    }

    if (typeof window.Razorpay === 'undefined') {
      alert('Razorpay SDK not loaded.');
      return;
    }

    const options = {
      key: 'rzp_test_L26VIOCFHsgOjT',
      amount: amountInPaise,
      currency: 'INR',
      name: 'Ticket Booking App',
      description: 'Movie Ticket Booking',
      handler: async (response) => {
        try {
          alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);

          await addDoc(collection(db, 'bookings'), {
            userId: 'testUserId',
            showId: show.id,
            seats: selectedSeats.length,
            selectedSeats,
            totalPrice,
            paymentId: response.razorpay_payment_id,
            timestamp: new Date(),
          });

          alert('📥 Booking saved to Firestore!');
        } catch (err) {
          console.error('Firestore Error:', err);
          alert('Payment succeeded but saving failed.');
        }
      },
      prefill: {
        email: 'shreyashbhagwat505@gmail.com',
      },
      theme: {
        color: '#4f46e5',
      },
      modal: {
        ondismiss: () => console.log('Payment modal closed.'),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (error) => {
      console.error('Payment Failed:', error.error);
      alert('❌ Payment failed: ' + error.error.description);
    });
    rzp.open();
  };

  if (loading) return <div>Loading checkout info...</div>;
  if (!show) return <div>Show not found.</div>;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

          .checkout-container {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            background: linear-gradient(to right, #eef2f3, #d9e2ec);
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .checkout-box {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            max-width: 700px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          @media (min-width: 768px) {
            .checkout-box {
              flex-direction: row;
              align-items: center;
            }
          }

          .poster {
            width: 100%;
            max-width: 250px;
            border-radius: 12px;
            object-fit: cover;
          }

          .checkout-info {
            flex: 1;
          }

          .checkout-title {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1a202c;
          }

          .checkout-details {
            font-size: 1.1rem;
            color: #333;
            margin-bottom: 0.5rem;
          }

          .pay-btn {
            margin-top: 1.5rem;
            background-color: #4f46e5;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .pay-btn:hover {
            background-color: #4338ca;
          }
        `}
      </style>

      <div className="checkout-container">
        <div className="checkout-box">
          <img
            src={show.poster || 'https://via.placeholder.com/250x375'}
            alt={show.title}
            className="poster"
          />
          <div className="checkout-info">
            <h2 className="checkout-title">{show.title}</h2>
            <p className="checkout-details">🎟 Selected Seats: <strong>{selectedSeats.length}</strong></p>
            <p className="checkout-details">📅 {show.date} 🕒 {show.time}</p>
            <p className="checkout-details">💰 Total Price: <strong>₹{totalPrice}</strong></p>
            <button className="pay-btn" onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
