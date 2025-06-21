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
    navigate(`/checkout/${showId}`, { state: { selectedSeats, totalPrice: selectedSeats.length * price } });
  };

  // Internal CSS styles as JavaScript objects
  const containerStyles = {
    padding: '2rem', // Increased padding for elegance
    backgroundColor: '#f5f7fa', // Light gray background
    minHeight: 'calc(100vh - 4rem)', // Adjust based on navbar height
  };

  const titleStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1.25rem', // Slightly larger for emphasis
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#1a2a6c', // Deep blue for professionalism
  };

  const gridStyles = {
    display: 'grid',
    gap: '1rem', // Consistent spacing between rows
  };

  const rowStyles = {
    display: 'flex',
    gap: '0.75rem', // Spacing between seats
    justifyContent: 'center',
  };

  const seatStyles = {
    width: '2.5rem', // Slightly larger seats
    height: '2.5rem',
    borderRadius: '0.375rem',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transitions
  };

  const seatBookedStyles = {
    backgroundColor: '#a0aec0', // Gray for booked seats
    cursor: 'not-allowed',
  };

  const seatSelectedStyles = {
    backgroundColor: '#48bb78', // Green for selected seats
  };

  const seatAvailableStyles = {
    backgroundColor: '#4b5e97', // Deep blue for available seats
  };

  const seatHoverStyles = {
    backgroundColor: '#3a4c7a', // Darker blue on hover
    transform: 'scale(1.1)', // Slight scale-up for interactivity
  };

  const infoStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1rem',
    color: '#333333',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
  };

  const buttonStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#4b5e97', // Deep blue
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyles = {
    backgroundColor: '#3a4c7a', // Darker shade on hover
  };

  return (
    <div style={containerStyles}>
      <h3 style={titleStyles}>Select Seats</h3>
      <div style={gridStyles}>
        {totalSeats.map((row, rowIndex) => (
          <div key={rowIndex} style={rowStyles}>
            {row.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                style={{
                  ...seatStyles,
                  ...(seat.booked ? seatBookedStyles : {}),
                  ...(selectedSeats.includes(seat.id) ? seatSelectedStyles : seatAvailableStyles),
                }}
                onMouseOver={(e) =>
                  !seat.booked &&
                  !selectedSeats.includes(seat.id) &&
                  Object.assign(e.target.style, seatHoverStyles)
                }
                onMouseOut={(e) =>
                  !seat.booked &&
                  !selectedSeats.includes(seat.id) &&
                  Object.assign(e.target.style, seatAvailableStyles)
                }
                disabled={seat.booked}
              >
                {seat.col}
              </button>
            ))}
          </div>
        ))}
      </div>
      <p style={infoStyles}>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
      <p style={infoStyles}>Total Price: ₹{selectedSeats.length * price || 0}</p>
      <button
        onClick={handleProceed}
        style={buttonStyles}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyles.backgroundColor)}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default SeatSelector;