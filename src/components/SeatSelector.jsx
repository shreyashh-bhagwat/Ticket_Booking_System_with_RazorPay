import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeatSelector({ showId, price }) {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalSeats = Array(5).fill().map((_, row) =>
    Array(10).fill().map((_, col) => ({
      id: `${row + 1}-${col + 1}`,
      row: row + 1,
      col: col + 1,
      booked: false, // Replace with Firestore check
    }))
  );

  const handleSeatClick = (seat) => {
    if (seat.booked) return;
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    // Pass selected seats and total price to checkout
    navigate(`/checkout/${showId}`, { state: { selectedSeats, totalPrice: selectedSeats.length * price } });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Select Seats</h3>
      <div className="grid gap-2">
        {totalSeats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                className={`w-10 h-10 rounded-md text-white ${
                  seat.booked ? 'bg-gray-500 cursor-not-allowed' :
                  selectedSeats.includes(seat.id) ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={seat.booked}
              >
                {seat.col}
              </button>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-4">Selected Seats: {selectedSeats.join(', ')}</p>
      <p>Total Price: ₹{selectedSeats.length * price}</p>
      <button
        onClick={handleProceed}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default SeatSelector;