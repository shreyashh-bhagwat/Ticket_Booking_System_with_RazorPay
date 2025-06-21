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

  // Premium color palette and glass effect styles
  const navStyles = {
    background: 'rgba(25, 35, 70, 0.7)', // Deep blue with transparency for glass effect
    backdropFilter: 'blur(10px)', // Glassmorphism blur effect
    WebkitBackdropFilter: 'blur(10px)', // Safari fallback
    color: '#ffffff', // White text
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Frosted border
  };

  const containerStyles = {
    maxWidth: '80rem', // Professional wide layout
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem', // Increased padding for elegance
  };

  const linkStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', // Modern, professional font
    fontSize: '1.25rem', // text-xl
    fontWeight: '600', // Slightly lighter bold for professionalism
    textDecoration: 'none',
    color: '#ffffff',
    transition: 'color 0.3s ease, text-decoration 0.3s ease', // Smooth transitions
  };

  const hoverLinkStyles = {
    color: '#d4af37', // Gold accent for premium feel
    textDecoration: 'underline',
  };

  const welcomeStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem', // Increased spacing for a premium look
  };

  const buttonStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '0.5rem 1rem', // More padding for a button-like feel
    borderRadius: '4px', // Slight rounding for elegance
    transition: 'color 0.3s ease, background-color 0.3s ease',
    textDecoration: 'none',
  };

  const buttonHoverStyles = {
    color: '#d4af37', // Gold on hover
    backgroundColor: 'rgba(212, 175, 55, 0.1)', // Subtle gold background
    textDecoration: 'underline',
  };

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        <Link
          to="/"
          style={linkStyles}
          onMouseOver={(e) => {
            e.target.style.color = hoverLinkStyles.color;
            e.target.style.textDecoration = hoverLinkStyles.textDecoration;
          }}
          onMouseOut={(e) => {
            e.target.style.color = linkStyles.color;
            e.target.style.textDecoration = 'none';
          }}
        >
          Ticket Booking
        </Link>
        <div style={welcomeStyles}>
          <Link
            to="/"
            style={linkStyles}
            onMouseOver={(e) => {
              e.target.style.color = hoverLinkStyles.color;
              e.target.style.textDecoration = hoverLinkStyles.textDecoration;
            }}
            onMouseOut={(e) => {
              e.target.style.color = linkStyles.color;
              e.target.style.textDecoration = 'none';
            }}
          >
            Home
          </Link>
          {user ? (
            <>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', color: '#e0e0e0' }}>
                Welcome, {user.email}
              </span>
              <button
                onClick={handleLogout}
                style={buttonStyles}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyles)}
                onMouseOut={(e) => {
                  e.target.style.color = buttonStyles.color;
                  e.target.style.backgroundColor = buttonStyles.background;
                  e.target.style.textDecoration = buttonStyles.textDecoration;
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={linkStyles}
                onMouseOver={(e) => {
                  e.target.style.color = hoverLinkStyles.color;
                  e.target.style.textDecoration = hoverLinkStyles.textDecoration;
                }}
                onMouseOut={(e) => {
                  e.target.style.color = linkStyles.color;
                  e.target.style.textDecoration = 'none';
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={linkStyles}
                onMouseOver={(e) => {
                  e.target.style.color = hoverLinkStyles.color;
                  e.target.style.textDecoration = hoverLinkStyles.textDecoration;
                }}
                onMouseOut={(e) => {
                  e.target.style.color = linkStyles.color;
                  e.target.style.textDecoration = 'none';
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;