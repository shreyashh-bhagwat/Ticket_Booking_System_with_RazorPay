import { Link } from 'react-router-dom';

function ShowCard({ show }) {
  const displayDate = show.date || '';
  const displayTime = show.time || '';

  return (
    <>
      <style>
        {`
          .show-card {
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .show-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }

          .show-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-bottom: 1px solid #eee;
          }

          .show-content {
            padding: 16px;
          }

          .show-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #222;
          }

          .show-description {
            font-size: 0.95rem;
            color: #555;
            margin-bottom: 10px;
            line-height: 1.4;
          }

          .show-datetime {
            font-size: 0.85rem;
            color: #777;
            margin-bottom: 6px;
          }

          .show-price {
            font-size: 0.9rem;
            color: #1a8f42;
            font-weight: 500;
            margin-bottom: 10px;
          }

          .show-link {
            display: inline-block;
            background-color: #4f46e5;
            color: white;
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 0.95rem;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }

          .show-link:hover {
            background-color: #4338ca;
          }
        `}
      </style>

      <div className="show-card">
        <img src={show.poster} alt={show.title} className="show-image" />
        <div className="show-content">
          <h3 className="show-title">{show.title}</h3>
          <p className="show-description">{show.description}</p>
          <p className="show-datetime">{displayDate} at {displayTime}</p>
          {show.price && <p className="show-price">Price: ₹{show.price}</p>}
          <Link to={`/show/${show.id}`} className="show-link">
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}

export default ShowCard;
