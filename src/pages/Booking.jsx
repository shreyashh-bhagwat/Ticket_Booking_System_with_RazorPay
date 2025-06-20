import { useParams } from 'react-router-dom';
import SeatSelector from '../components/SeatSelector';

function Booking() {
  const { id } = useParams();
  const price = 250; // Replace with dynamic price from show data

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Book Tickets for Movie {id}</h2>
        <SeatSelector showId={id} price={price} />
      </div>
    </div>
  );
}

export default Booking;