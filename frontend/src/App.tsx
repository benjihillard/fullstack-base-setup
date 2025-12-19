import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </Link>
          <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium">
            About
          </Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
