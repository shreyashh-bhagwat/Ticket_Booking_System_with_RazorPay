function Receipt({ receipt }) {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
        <p>Receipt ID: {receipt.receiptId}</p>
        <p>Movie: Movie {receipt.showId}</p>
        <p>Seats: {receipt.seats.join(', ')}</p>
        <p>Total Price: ₹{receipt.totalPrice}</p>
        <p>Payment ID: {receipt.paymentId}</p>
        <p>Date: {receipt.timestamp.toDate().toLocaleString()}</p>
        <a
          href="/"
          className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default Receipt;