import { Link } from 'react-router-dom';

function ShowCard({ show }) {
  const displayDate = show.date || '';
  const displayTime = show.time || '';

  return (
    <>
      <style>
        {`
          .show-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .show-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }

          .show-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .show-content {
            padding: 20px;
            color: #ffffff;
          }

          .show-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: #ffffff;
          }

          .show-description {
            font-size: 0.95rem;
            color: #e0e0e0;
            margin-bottom: 10px;
            line-height: 1.5;
          }

          .show-datetime {
            font-size: 0.85rem;
            color: #bbbbbb;
            margin-bottom: 8px;
          }

          .show-price {
            font-size: 0.95rem;
            color: #32cd86;
            font-weight: 600;
            margin-bottom: 12px;
          }

          .show-link {
            display: inline-block;
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: #fff;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 0.95rem;
            text-decoration: none;
            font-weight: 500;
            transition: background 0.3s ease, transform 0.2s ease;
          }

          .show-link:hover {
            background: linear-gradient(135deg, #7c3aed, #5b21b6);
            transform: scale(1.05);
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
