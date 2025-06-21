
function Receipt({ receipt }) {
  // Internal CSS styles as JavaScript objects
  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa', // Light gray background for elegance
    paddingTop: '2rem',
    paddingBottom: '2rem',
  };

  const cardStyles = {
    maxWidth: '60rem', // Wider for a premium feel
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'rgba(255, 255, 255, 0.9)', // White with slight transparency
    backdropFilter: 'blur(10px)', // Glass effect
    WebkitBackdropFilter: 'blur(10px)', // Safari fallback
    borderRadius: '0.5rem',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Enhanced shadow for depth
    padding: '1.5rem',
  };

  const titleStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1.5rem', // Slightly larger for emphasis
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#1a2a6c', // Deep blue for professionalism
  };

  const textStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1rem',
    color: '#333333',
    marginBottom: '0.5rem',
  };

  const buttonStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#4b5e97', // Deep blue from premium palette
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '1.5rem',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyles = {
    backgroundColor: '#3a4c7a', // Darker shade on hover
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h2 style={titleStyles}>Booking Confirmed!</h2>
        <p style={textStyles}>Receipt ID: {receipt.receiptId}</p>
        <p style={textStyles}>Movie: Movie {receipt.showId}</p>
        <p style={textStyles}>Seats: {receipt.seats.join(', ')}</p>
        <p style={textStyles}>Total Price: ₹{receipt.totalPrice}</p>
        <p style={textStyles}>Payment ID: {receipt.paymentId}</p>
        <p style={textStyles}>Date: {receipt.timestamp.toDate().toLocaleString()}</p>
        <a
          href="/"
          style={buttonStyles}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyles.backgroundColor)}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default Receipt;