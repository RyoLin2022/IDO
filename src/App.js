import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Mechanism from './Pages/Mechanism';
import IDO from './Pages/IDO';

function App() {
  return (
    <div className="App" id="bg">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/mechanism' element={<Mechanism />} />
          <Route path='/IDO' element={<IDO />} />
        </Routes>
      </Router>
      <h1>Designer <a href="https://t.me/RyoLin" className="Ryo">RyoLin</a></h1>
    </div>
  );
}
export default App;

