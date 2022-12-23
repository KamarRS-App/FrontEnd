import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import TambahData from "./pages/TambahData";
import DataDiriPasien from "./pages/DataDiriPasien";
import DetailCariRumahSakit from "./pages/DetailCariRumahSakit";
import Dashboard from "./pages/Admin/Dashboard";
import DetailDaftarRumahSakit from "./pages/DetailDaftarRumahSakit";
import Pembayaran from "./pages/Pembayaran";
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import theme from "../utils/extendedTheme";
import { ChakraProvider } from "@chakra-ui/react";
import { Container, Heading } from "@chakra-ui/layout";

function App() {
  return (
    <ChakraProvider theme={theme}>

      {/* <Login /> */}
      {/* <Register /> */}
      {/* <HomePage /> */}
      {/* <TambahData /> */}
      {/* <DataDiriPasien /> */}
      {/* <Riwayat /> */}
      {/* <DetailCariRumahSakit /> */}
      {/* <DetailDaftarRumahSakit />  */}
      {/* <Dashboard /> */}
      {/* <Heading>Halo</Heading> */}
      <Pembayaran />
    </ChakraProvider>
  );
}

export default App;
