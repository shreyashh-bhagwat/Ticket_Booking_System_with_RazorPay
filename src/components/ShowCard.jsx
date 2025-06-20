import { Link } from 'react-router-dom';

function ShowCard({ show }) {
  const displayDate = show.date || '';
  const displayTime = show.time || '';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img src={show.poster} alt={show.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{show.title}</h3>
        <p className="text-sm text-gray-600">{show.description}</p>
        <p className="text-sm text-gray-500 mt-2">{displayDate} at {displayTime}</p>
        {show.price && <p className="text-sm text-green-600 mt-1">Price: ₹{show.price}</p>}
        <Link
          to={`/show/${show.id}`}
          className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ShowCard;