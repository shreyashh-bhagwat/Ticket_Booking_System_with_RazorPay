import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('❌ ' + err.message);
    }
  };

  return (
    <>
      {/* Internal styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

          .login-container {
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            background: linear-gradient(120deg, #f5f7fa, #c3cfe2);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }

          .login-box {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 100%;
            max-width: 400px;
          }

          .login-title {
            text-align: center;
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #1a2a6c;
          }

          .login-form label {
            display: block;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
            color: #333;
          }

          .login-form input {
            width: 100%;
            padding: 0.6rem 0.8rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: border 0.3s ease;
            margin-bottom: 1rem;
          }

          .login-form input:focus {
            border-color: #4f46e5;
            outline: none;
          }

          .login-btn {
            width: 100%;
            background-color: #4f46e5;
            color: white;
            padding: 0.7rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .login-btn:hover {
            background-color: #4338ca;
          }

          .login-error {
            color: #e53e3e;
            background-color: #ffe5e5;
            padding: 0.5rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            text-align: center;
          }

          .login-footer {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.9rem;
            color: #555;
          }

          .login-footer a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
          }

          .login-footer a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="login-footer">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
