import Pembayaran from "./pages/Pembayaran";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import SettingPage from "./pages/Admin/SettingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import TambahData from "./pages/TambahData";
import DataDiriPasien from "./pages/DataDiriPasien";
import DetailCariRumahSakit from "./pages/DetailCariRumahSakit";
import Dashboard from "./pages/Admin/Dashboard";
import DetailDaftarRumahSakit from "./pages/DetailDaftarRumahSakit";
import DashboardDailyPraktek from "./pages/Admin/DashboardDailyPraktek";
import UserPage from "./pages/Admin/UserPage";
import RoomPage from "./pages/Admin/RoomPage";
import PatientPage from "./pages/Admin/PatientPage";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import theme from "../utils/extendedTheme";
import "./App.css";
import DoctorPage from "./pages/Admin/DoctorPage";
import ProfileHospitalPage from "./pages/Admin/ProfileHospitalPage";
import DetailDaftarRumahSakit from './pages/DetailDaftarRumahSakit';
import Pembayaran from './pages/Pembayaran';
import Payment from './pages/Payment';
import PembayaranSelesai from './pages/PembayaranSelesai';
import CariDokter from './pages/CariDokter';
import DetailDokter from './pages/DetailDokter';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box minHeight={"100vh"}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/patient/add" element={<TambahData />} />
            <Route path="/patient" element={<DataDiriPasien />} />
            <Route path="/search/detail" element={<DetailCariRumahSakit />} />
            <Route
              path="/detail/patient"
              element={<DetailDaftarRumahSakit />}
            />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/daily_praktek"
              element={<DashboardDailyPraktek />}
            />
            <Route path="/payment" element={<Pembayaran />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/profile" element={<SettingPage />} />
            <Route path="/admin/room" element={<RoomPage />} />
            <Route path="/admin/patient" element={<PatientPage />} />
            <Route path="/admin/doctor" element={<DoctorPage />} />
            <Route path="/admin/hospital/profile" element={<ProfileHospitalPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="pembayaran/selesai" element={<PembayaranSelesai />} />
            <Route path="cari/dokter" element={<CariDokter />} />
            <Route path="detail/dokter" element={<DetailDokter />} />
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
