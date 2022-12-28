import axios from "axios";

const instance = axios.create({
  baseURL: "https://virtserver.swaggerhub.com/kamar-rs/kamar-rs/1.0.0/",
});

export default {
  //Auth
  loginUser: (data) =>
    instance({
      method: `POST`,
      url: `login/users`,
      data: {
        email: data.email,
        kata_sandi: data.kata_sandi,
      },
    }),

  loginAdmin: ({ email, password }) =>
    instance({
      method: `POST`,
      url: `login/staff`,
      data: {
        email: email,
        password: password,
      },
    }),

  loginUserOauth: ({ oauth }) =>
    instance({
      method: `POST`,
      url: `oauth/login/user`,
      data: {
        oauth: oauth,
      },
    }),

  //Users
  register: (token, { nama, email, no_nik, no_kk, kata_sandi, no_telepon }) =>
    instance({
      method: `POST`,
      url: `/users`,
      data: {
        nama: nama,
        email: email,
        no_nik: no_nik,
        no_kk: no_kk,
        kata_sandi: kata_sandi,
        no_telepon: no_telepon,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateUser: (token, { nama, email, no_nik, no_kk, kata_sandi, no_telepon }) =>
    instance({
      method: `PUT`,
      url: `/users`,
      data: {
        nama: nama,
        email: email,
        no_nik: no_nik,
        no_kk: no_kk,
        kata_sandi: kata_sandi,
        no_telepon: no_telepon,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUser: (token) =>
    instance({
      method: `GET`,
      url: `/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteUser: (token) =>
    instance({
      method: `DELETE`,
      url: `/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //Hospital Staff (Admin)
  createAdmin: (token, { nama, email, kata_sandi, peran, hospital_id }) =>
    instance({
      method: `POST`,
      url: `/staffs`,
      data: {
        nama: nama,
        email: email,
        kata_sandi: kata_sandi,
        peran: peran,
        hospital_id: hospital_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateAdmin: (token, { nama, email, kata_sandi, peran, hospital_id }) =>
    instance({
      method: `PUT`,
      url: `/staffs`,
      data: {
        nama: nama,
        email: email,
        kata_sandi: kata_sandi,
        peran: peran,
        hospital_id: hospital_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteAdmin: (token) =>
    instance({
      method: `DELETE`,
      url: `/staffs`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getAdmin: (token) =>
    instance({
      method: `GET`,
      url: `/staffs`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //Hospital
  createHospital: (
    token,
    {
      kode_rs,
      nama,
      foto,
      alamat,
      provinsi,
      kabupaten_kota,
      kecamatan,
      no_telepon,
      email,
      kelas_rs,
      pemilik_pengelola,
      jumlah_tempat_tidur,
      status_penggunaan,
      biaya_pendaftaran,
    }
  ) =>
    instance({
      method: `POST`,
      url: `/hospitals`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: {
        kode_rs: kode_rs,
        nama: nama,
        foto: foto,
        alamat: alamat,
        provinsi: provinsi,
        kabupaten_kota: kabupaten_kota,
        kecamatan: kecamatan,
        no_telepon: no_telepon,
        email: email,
        kelas_rs: kelas_rs,
        pemilik_pengelola: pemilik_pengelola,
        jumlah_tempat_tidur: jumlah_tempat_tidur,
        status_penggunaan: status_penggunaan,
        biaya_pendaftaran: biaya_pendaftaran,
      },
    }),

  UpdateHospital: (
    token,
    {
      kode_rs,
      nama,
      foto,
      alamat,
      provinsi,
      kabupaten_kota,
      kecamatan,
      no_telepon,
      email,
      kelas_rs,
      pemilik_pengelola,
      jumlah_tempat_tidur,
      status_penggunaan,
      biaya_pendaftaran,
    }
  ) =>
    instance({
      method: `PUT`,
      url: `/hospitals`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: {
        kode_rs: kode_rs,
        nama: nama,
        foto: foto,
        alamat: alamat,
        provinsi: provinsi,
        kabupaten_kota: kabupaten_kota,
        kecamatan: kecamatan,
        no_telepon: no_telepon,
        email: email,
        kelas_rs: kelas_rs,
        pemilik_pengelola: pemilik_pengelola,
        jumlah_tempat_tidur: jumlah_tempat_tidur,
        status_penggunaan: status_penggunaan,
        biaya_pendaftaran: biaya_pendaftaran,
      },
    }),

  deleteHospital: (token) =>
    instance({
      method: `DELETE`,
      url: `/hospitals`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getHospitals: (token) =>
    instance({
      method: `GET`,
      url: `/hospitals`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getHospitalByID: (token, id) =>
    instance({
      method: `GET`,
      url: `/hospital/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //patient
  createPatient: (
    token,
    {
      no_kk,
      nik,
      nama_pasien,
      jenis_kelamin,
      usia,
      nama_wali,
      email_wali,
      no_telepon_wali,
      alamat_ktp,
      kabupaten_kota_ktp,
      alamat_domisili,
      provinsi_domisili,
      kabupaten_kota_domisili,
      tanggal_lahir,
      no_bpjs,
      kelas_bpjs,
      foto_ktp,
      foto_bpjs,
    }
  ) =>
    instance({
      method: `POST`,
      url: `/patients`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: {
        no_kk: no_kk,
        nik: nik,
        nama_pasien: nama_pasien,
        jenis_kelamin: jenis_kelamin,
        usia: usia,
        nama_wali: nama_wali,
        email_wali: email_wali,
        no_telepon_wali: no_telepon_wali,
        alamat_ktp: alamat_ktp,
        kabupaten_kota_ktp: kabupaten_kota_ktp,
        alamat_domisili: alamat_domisili,
        provinsi_domisili: provinsi_domisili,
        kabupaten_kota_domisili: kabupaten_kota_domisili,
        tanggal_lahir: tanggal_lahir,
        no_bpjs: no_bpjs,
        kelas_bpjs: kelas_bpjs,
        foto_ktp: foto_ktp,
        foto_bpjs: foto_bpjs,
      },
    }),
};
