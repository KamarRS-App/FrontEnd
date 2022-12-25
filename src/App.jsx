import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import TambahData from './pages/TambahData';
import DataDiriPasien from './pages/DataDiriPasien';
import DetailCariRumahSakit from './pages/DetailCariRumahSakit';
import Dashboard from './pages/Admin/Dashboard';
import DetailDaftarRumahSakit from './pages/DetailDaftarRumahSakit';
import Pembayaran from './pages/Pembayaran';
import Payment from './pages/Payment';
import PembayaranSelesai from './pages/PembayaranSelesai';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/cari/rs" element={<CariRumahSakit />} /> */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <HomePage /> */}
        {/* <TambahData /> */}
        {/* <DataDiriPasien /> */}
        {/* <Riwayat /> */}
        {/* <DetailCariRumahSakit /> */}
        {/* <DetailDaftarRumahSakit />  */}
        {/* <Dashboard /> */}
        {/*<Pembayaran /> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="pembayaran/selesai" element={<PembayaranSelesai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
