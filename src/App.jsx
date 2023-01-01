import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./pages/Login";
import SettingPage from "./pages/Admin/SettingPage";
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
import PatientRegistrationPage from "./pages/Admin/PatientRegistrationPage";
import DoctorPage from "./pages/Admin/DoctorPage";
import ProfileHospitalPage from "./pages/Admin/ProfileHospitalPage";
import LoginAdmin from "./pages/Admin/LoginAdmin";

import Pembayaran from "./pages/Pembayaran";
import Payment from "./pages/Payment";
import PembayaranSelesai from "./pages/PembayaranSelesai";
import CariDokter from "./pages/CariDokter";
import DetailDokter from "./pages/DetailDokter";
import DashboardRoot from "./pages/Admin/DashboardRoot";
import HospitalRootPages from "./pages/Admin/HospitalRootPages";
import AdminRoot from "./pages/Admin/AdminRoot";
import BuatJanjiDokter from "./pages/BuatJanjiDokter";
import TentangKami from "./pages/TentangKami";
import Privasi from "./pages/Privasi";
import SyaratDanKetentuan from "./pages/SyaratDanKetentuan";
import Poliklinik from "./pages/Admin/Poliklinik";
import LoginAdminRoot from "./pages/Admin/LoginAdminRoot";

import "./App.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import theme from "../utils/extendedTheme";
import store from "../store";
import PoliclinicPages from "./pages/Admin/PoliclinicPages";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Box minHeight={"100vh"}>
            <Routes>
              {/* user */}

              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pasien" element={<TambahData />} />
              <Route path="/pasien/tambah/" element={<DataDiriPasien />} />
              <Route path="/search/detail" element={<DetailCariRumahSakit />} />
              <Route
                path="/detail/patient"
                element={<DetailDaftarRumahSakit />}
              />
              <Route path="/pilih/metode/pembayaran" element={<Payment />} />
              <Route
                path="pembayaran/selesai"
                element={<PembayaranSelesai />}
              />
              <Route path="dokter" element={<CariDokter />} />
              <Route path="detail/dokter" element={<DetailDokter />} />
              <Route path="/buat/janji/dokter" element={<BuatJanjiDokter />} />
              <Route path="/tentang/kami" element={<TentangKami />} />
              <Route path="/halaman/privasi" element={<Privasi />} />
              <Route
                path="/syarat/dan/ketentuan"
                element={<SyaratDanKetentuan />}
              />

              {/* admin */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route
                path="/admin/daily_praktek"
                element={<DashboardDailyPraktek />}
              />
              <Route path="/payment" element={<Pembayaran />} />
              <Route path="/admin/user" element={<UserPage />} />
              <Route path="/admin/profile" element={<SettingPage />} />
              <Route path="/admin/room" element={<RoomPage />} />
              {/* <Route path="/admin/patient" element={<PatientPage />} /> */}
              <Route path="/admin/doctor" element={<DoctorPage />} />
              <Route path="/admin/poliklinik" element={<Poliklinik />} />
              <Route
                path="/admin/hospital/profile"
                element={<ProfileHospitalPage />}
              />
              <Route path="/admin/login" element={<LoginAdmin />} />

              {/* super admin */}
              <Route path="/root/dashboard" element={<DashboardRoot />} />
              <Route path="/root/hospital" element={<HospitalRootPages />} />
              <Route path="/root/user" element={<AdminRoot />} />
            </Routes>
          </Box>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
