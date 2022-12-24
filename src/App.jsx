import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import TambahData from "./pages/TambahData";
import DataDiriPasien from "./pages/DataDiriPasien";
import DetailCariRumahSakit from "./pages/DetailCariRumahSakit";
import Dashboard from "./pages/Admin/Dashboard";
import DetailDaftarRumahSakit from "./pages/DetailDaftarRumahSakit";
import Pembayaran from "./pages/Pembayaran";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
