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
  }, [location.state]);

  const handlePayment = () => {
    try {
      // Validate amount
      const amountInPaise = Math.round(totalPrice * 100);
      if (isNaN(amountInPaise) || amountInPaise <= 0) {
        throw new Error('Invalid payment amount');
      }

      const options = {
        key: 'rzp_test_L26VIOCFHsgOjT', // Confirm this is your Test Key ID
        amount: amountInPaise, // Amount in paise
        currency: 'INR',
        name: 'Ticket Booking App',
        description: 'Movie Ticket Booking',
        // Note: Mock order_id is not ideal; Razorpay prefers server-side order creation
        order_id: 'order_' + Math.random().toString(36).substr(2, 9),
        handler: async (response) => {
          console.log('Payment Response:', response);
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert('Payment Successful');
          const bookingData = {
            userId: 'testUserId', // Replace with auth.currentUser.uid
            showId: show.id,
            seats: selectedSeats.length,
            totalPrice,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            timestamp: new Date(),
          };
          await addDoc(collection(db, 'bookings'), bookingData);
          alert('Payment successful! Check Firestore for booking data.');
        },
        prefill: {
          email: 'shreyashbhagwat505@gmail.com', // Replace with auth.currentUser.email
        },
        theme: { color: '#4f46e5' },
        modal: {
          ondismiss: () => console.log('Payment modal dismissed'),
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (error) => {
        console.error('Payment Failed:', error.error.description);
        alert('Payment failed: ' + error.error.description);
      });
      razorpay.open();
    } catch (error) {
      console.error('Razorpay Initialization Error:', error);
      alert('Failed to initialize payment: ' + error.message);
    }
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