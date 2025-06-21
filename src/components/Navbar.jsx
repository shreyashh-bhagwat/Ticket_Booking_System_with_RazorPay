import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Internal CSS for enhanced navbar styling */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

          .navbar {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(90deg, rgba(26, 32, 44, 0.9), rgba(44, 36, 64, 0.9));
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: #ffffff;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 12px rgba(107, 70, 193, 0.2);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(107, 70, 193, 0.3);
          }

          .nav-left a {
            font-size: 1.75rem;
            font-weight: 700;
            color: #6B46C1;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-shadow: 0 1px 3px rgba(107, 70, 193, 0.3);
            transition: transform 0.3s ease;
          }

          .nav-left a:hover {
            transform: scale(1.05);
          }

          .nav-left svg {
            height: 28px;
            fill: #6B46C1;
            transition: transform 0.3s ease;
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
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            transition: all 0.3s ease;
            border: none;
            background: linear-gradient(45deg, rgba(107, 70, 193, 0.2), rgba(128, 90, 213, 0.2));
            cursor: pointer;
          }

          .nav-link:hover, .logout-btn:hover {
            background: linear-gradient(45deg, #6B46C1, #805AD5);
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(107, 70, 193, 0.4);
          }

          .welcome-text {
            color: #A0AEC0;
            font-size: 0.95rem;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            background: rgba(26, 32, 44, 0.7);
            backdrop-filter: blur(8px);
          }

          .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background 0.3s ease;
          }

          .hamburger:hover {
            background: rgba(107, 70, 193, 0.2);
          }

          .hamburger span {
            width: 25px;
            height: 3px;
            background: #ffffff;
            border-radius: 2px;
            transition: all 0.3s ease;
          }

          .hamburger.open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }

          .hamburger.open span:nth-child(2) {
            opacity: 0;
          }

          .hamburger.open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
          }

          .mobile-menu {
            display: none;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            padding: 1rem;
            background: linear-gradient(180deg, rgba(26, 32, 44, 0.9), rgba(44, 36, 64, 0.9));
            backdrop-filter: blur(12px);
            border-top: 1px solid rgba(107, 70, 193, 0.3);
            animation: slideDown 0.3s ease;
          }

          .mobile-menu.open {
            display: flex;
          }

          @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @media (max-width: 768px) {
            .navbar {
              flex-direction: row;
              align-items: center;
              padding: 1rem;
            }

            .nav-right {
              display: none;
            }

            .hamburger {
              display: flex;
            }

            .mobile-menu.open {
              display: flex;
            }

            .nav-link, .logout-btn, .welcome-text {
              width: 100%;
              text-align: center;
            }
          }
        `}
      </style>

      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">
            {/* Enhanced SVG logo icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 3v2H4v14h16V5h-5V3h7v18H2V3h7zM12 8l4 4-4 4V12H8v-2h4V8z" />
            </svg>
            ShowTime
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`nav-right ${isMobileMenuOpen ? 'mobile-menu open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.email}</span>
              <button className="logout-btn" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;