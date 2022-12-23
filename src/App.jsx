import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import TambahData from "./pages/TambahData";
import DataDiriPasien from "./pages/DataDiriPasien";
import DetailCariRumahSakit from "./pages/DetailCariRumahSakit";
import DetailDaftarRumahSakit from "./pages/DetailDaftarRumahSakit";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <HomePage /> */}
      {/* <TambahData /> */}
      {/* <DataDiriPasien /> */}
      {/* <Riwayat /> */}
      {/* <DetailCariRumahSakit /> */}
      <DetailDaftarRumahSakit />
    </div>
  );
}

export default App;
