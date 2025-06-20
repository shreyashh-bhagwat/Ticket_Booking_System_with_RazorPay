import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ShowDetails from './pages/ShowDetails';
import Booking from './pages/Booking';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;