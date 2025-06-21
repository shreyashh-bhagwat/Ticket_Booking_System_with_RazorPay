import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

function Checkout() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const show = location.state?.show || { id: 'defaultShowId', price: 1 };
  const pricePerSeat = show.price || 1;

  useEffect(() => {
    const seats = location.state?.selectedSeats || [1];
    setSelectedSeats(seats);
    setTotalPrice(seats.length * pricePerSeat);
  }, [location.state, pricePerSeat]);

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
      key: 'rzp_test_L26VIOCFHsgOjT', // ✅ Razorpay Test Key
      amount: amountInPaise,
      currency: 'INR',
      name: 'Ticket Booking App',
      description: 'Movie Ticket Booking',
      handler: async (response) => {
        try {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert('Payment Successful');

          await addDoc(collection(db, 'bookings'), {
            userId: 'testUserId', // 🔁 Replace with actual auth.currentUser.uid
            showId: show.id,
            seats: selectedSeats.length,
            totalPrice,
            paymentId: response.razorpay_payment_id,
            timestamp: new Date(),
          });

          alert('Booking saved to Firestore successfully!');
        } catch (err) {
          console.error('Firestore Error:', err);
          alert('Payment succeeded but failed to save booking.');
        }
      },
      prefill: {
        email: 'shreyashbhagwat505@gmail.com', // 🔁 Replace with auth.currentUser.email
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
      alert('Payment failed: ' + error.error.description);
    });
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p>Selected Seats: {selectedSeats.length}</p>
        <p>Total Price: ₹{totalPrice}</p>
        <button
          onClick={handlePayment}
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Checkout;
