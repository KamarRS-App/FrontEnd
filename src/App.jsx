import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TambahData from './pages/TambahData';
import DataDiriPasien from './pages/DataDiriPasien';
import Payment from './pages/Payment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/cari/rs" element={<CariRumahSakit />} /> */}
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
