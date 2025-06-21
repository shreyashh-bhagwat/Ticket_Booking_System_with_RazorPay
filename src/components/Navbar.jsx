import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <>
      {/* Internal CSS for modern navbar styling */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

          .navbar {
            font-family: 'Poppins', sans-serif;
            background: rgba(25, 35, 70, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: #ffffff;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
          }

          .nav-left a {
            font-size: 1.5rem;
            font-weight: 600;
            color: #ffffff;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .nav-left svg {
            height: 24px;
            fill: #ffffff;
          }

          .nav-right {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          .nav-link, .logout-btn {
            font-weight: 500;
            font-size: 1rem;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.3s ease;
            border: none;
            background: none;
            cursor: pointer;
          }

          .nav-link:hover, .logout-btn:hover {
            color: #fcd34d;
            text-decoration: underline;
          }

          .welcome-text {
            color: #e5e5e5;
            font-size: 0.95rem;
          }

          @media (max-width: 768px) {
            .navbar {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }

            .nav-right {
              flex-wrap: wrap;
              gap: 1rem;
            }
          }
        `}
      </style>

      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">
            {/* Simple SVG logo icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 3v2H4v14h16V5h-5V3h7v18H2V3h7z" />
            </svg>
            TicketBooking
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
