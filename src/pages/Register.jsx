import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert('✅ Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (err) {
      setError('❌ ' + err.message);
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

          .register-container {
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            background: linear-gradient(120deg, #dbe6f6, #c5796d);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }

          .register-box {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 100%;
            max-width: 400px;
          }

          .register-title {
            text-align: center;
            font-size: 1.75rem;
            font-weight: 600;
            color: #1a2a6c;
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            font-size: 0.9rem;
            margin-bottom: 0.4rem;
            color: #333;
          }

          .form-input {
            width: 100%;
            padding: 0.6rem 0.8rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 0.95rem;
            margin-bottom: 1.2rem;
            transition: border-color 0.3s ease;
          }

          .form-input:focus {
            border-color: #4f46e5;
            outline: none;
          }

          .form-button {
            width: 100%;
            background-color: #4f46e5;
            color: white;
            padding: 0.7rem;
            font-size: 1rem;
            font-weight: 500;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .form-button:hover {
            background-color: #4338ca;
          }

          .register-error {
            color: #e53e3e;
            background-color: #ffe5e5;
            padding: 0.5rem;
            border-radius: 6px;
            font-size: 0.9rem;
            text-align: center;
            margin-bottom: 1rem;
          }

          .form-footer {
            text-align: center;
            font-size: 0.9rem;
            color: #555;
            margin-top: 1rem;
          }

          .form-footer a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
          }

          .form-footer a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">Register</h2>
          {error && <div className="register-error">{error}</div>}

          <form onSubmit={handleRegister}>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />

            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />

            <button type="submit" className="form-button">Register</button>
          </form>

          <p className="form-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
