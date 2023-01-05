import axios from "axios";

const instance = axios.create({
  baseURL: "https://rawatinap.online",
});

export default {
  //Auth
  loginUser: (email, password) =>
    instance({
      method: `POST`,
      url: `/login/users`,
      data: {
        email: email,
        kata_sandi: password,
      },
    }),

  loginAdmin: (data) =>
    instance({
      method: `POST`,
      url: `/login/staffs`,
      data: {
        email: data.email,
        kata_sandi: data.kata_sandi,
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

  loginSuperAdmin: (data) =>
    instance({
      method: `POST`,
      url: `/login/kamarrsteams`,
      data: {
        email: data.email,
        kata_sandi: data.kata_sandi,
      },
    }),
  //Users
  register: (data) =>
    instance({
      method: `POST`,
      url: `/users`,
      data: {
        nama: data.username,
        email: data.email,
        nik: JSON.stringify(data.nik),
        no_kk: JSON.stringify(data.no_kk),
        kata_sandi: data.kata_sandi,
        no_telpon: JSON.stringify(data.nomorhape),
      },
    }),
  updateUser: (token, data) =>
    instance({
      method: `PUT`,
      url: `/users`,
      data: {
        nama: data.nama,
        email: data.email,
        no_nik: data.no_nik,
        no_kk: data.no_kk,
        kata_sandi: data.kata_sandi,
        no_telpon: data.no_telpon,
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
  createAdmin: (token, data) =>
    instance({
      method: `POST`,
      url: `/staffs`,
      data: {
        nama: data.nama,
        email: data.email,
        kata_sandi: data.kata_sandi,
        peran: data.peran,
        hospital_id: data.hospital_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateAdmin: (token, id, data) =>
    instance({
      method: `PUT`,
      url: `/staffs/${id}`,
      data: {
        nama: data.nama,
        email: data.email,
        peran: data.peran,
        hospital_id: data.hospital_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteAdmin: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/staffs/${id}`,
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

  getAdminById: (token, id) =>
    instance({
      method: `GET`,
      url: `/staffs/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //Hospital
  deleteHospital: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/hospitals/${id}`,
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
      url: `/hospitals/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //patient
  updatePatient: (token, id, data) =>
    instance({
      method: `PUT`,
      url: `/patients/${id}`,
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
  deletePatient: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/patients/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPatientById: (token, id) =>
    instance({
      method: `GET`,
      url: `/patients/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPatientByUserId: (token, user_id) =>
    instance({
      method: `GET`,
      url: `/users/${user_id}/patients`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //patient
  createPatient: (token, data) =>
    instance({
      method: `POST`,
      url: `/patients`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: data,
      // {
      // no_kk: data.no_kk,
      // nik: data.nik,
      // nama_pasien: data.nama_pasien,
      // jenis_kelamin: data.jenisKelamin,
      // tanggal_lahir: data.tanggalLahir,
      // usia: data.usia,
      // nama_wali: data.namaWali,
      // email_wali: data.emailWali,
      // no_telpon_wali: data.noTelpWali,
      // alamat_ktp: data.alamatKTP,
      // kabupaten_kota_ktp: data.kota_ktp,
      // alamat_domisili: data.domisili,
      // provinsi_domisili: data.provinsi,
      // provinsi_ktp: data.provinsi_ktp,
      // kabupaten_kota_domisili: data.kota,
      // no_bpjs: data.noBPJS,
      // kelas_bpjs: data.kelas_bpjs,
      // foto_ktp: data.fotoKTP,
      // foto_bpjs: data.fotoBPJS,
      // },
    }),
  updatePatient: (
    token,
    id,
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
      method: `PUT`,
      url: `/patients/${id}`,
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
  deletePatient: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/patients/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPatientById: (token, id) =>
    instance({
      method: `GET`,
      url: `/patients/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPatientByUserId: (token, user_id) =>
    instance({
      method: `GET`,
      url: `/users/${user_id}/patients`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //hospital bed
  createHospitalBed: (
    token,
    { hospital_id, nama_tempat_tidur, ruangan, kelas, status }
  ) =>
    instance({
      method: `POST`,
      url: `/beds`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        hospital_id: hospital_id,
        nama_tempat_tidur: nama_tempat_tidur,
        raungan: ruangan,
        kelas: kelas,
        status: status,
      },
    }),
  updateHospitalBed: (
    token,
    id,
    { hospital_id, nama_tempat_tidur, ruangan, kelas, status }
  ) =>
    instance({
      method: `PUT`,
      url: `/beds/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        hospital_id: hospital_id,
        nama_tempat_tidur: nama_tempat_tidur,
        raungan: ruangan,
        kelas: kelas,
        status: status,
      },
    }),
  getAllBeds: (token, id) =>
    instance({
      method: `GET`,
      url: `hospitals/${id}/beds`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getBedById: (token, id) =>
    instance({
      method: `GET`,
      url: `/beds/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  DeleteBedById: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/beds/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //doctors
  createDoctor: (token, data) =>
    instance({
      method: `POST`,
      url: `/doctors`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: {
        nama: data.nama,
        email: data.email,
        spesialis: data.bidang,
        no_telpon: data.no_telpon,
        foto: data.foto,
      },
    }),
  updateDoctor: (token, id, data) =>
    instance({
      method: `PUT`,
      url: `/doctors/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        nama: data.nama,
        email: data.email,
        bidang: data.bidang,
        no_telpon: data.no_telpon,
      },
    }),
  deleteDoctor: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/doctors/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getAllDoctors: (token) =>
    instance({
      method: `GET`,
      url: `/doctors`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getDoctorById: (token, id) =>
    instance({
      method: `GET`,
      url: `/doctors/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //policlinics
  createPoliclinic: (token, data) =>
    instance({
      method: `POST`,
      url: `/policlinics`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        hospital_id: data.hospital_id,
        nama_poli: data.nama_poli,
        jam_praktik: data.jam_praktik,
      },
    }),
  updatePoliclinic: (token, id, data) =>
    instance({
      method: `PUT`,
      url: `/policlinics/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        hospital_id: data.hospital_id,
        nama_poli: data.nama_poli,
        jam_praktik: data.jam_praktik,
      },
    }),
  getAllPoliclinics: (token) =>
    instance({
      method: `GET`,
      url: `/policlinics`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPoliclinicById: (token, id) =>
    instance({
      method: `GET`,
      url: `/policlinics/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  DeletePoliclinic: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/policlinics/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //checkup reservations
  createCheckUpReservation: (token, { patient_id, practice_id }) =>
    instance({
      method: `POST`,
      url: `/reservations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        patient_id: patient_id,
        practice_id: practice_id,
      },
    }),

  getAllCheckUpReservations: (token) =>
    instance({
      method: `GET`,
      url: `/reservations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //daily practice
  createDailyPractice: (token, data) =>
    instance({
      method: `POST`,
      url: `/practices`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        policlinic_id: parseInt(data.policlinic_id),
        tanggal_praktik: data.tanggal_praktik,
        kuota_harian: parseInt(data.kuota_harian),
        status: data.status,
      },
    }),
  updateDailyPractice: (token, id, data) =>
    instance({
      method: `PUT`,
      url: `/practices/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: data.id,
        tanggal_praktik: data.tanggal_praktik,
        kuota_harian: parseInt(data.kuota_harian),
        status: data.status,
      },
    }),
  getAllDailyPractices: (token, id) =>
    instance({
      method: `GET`,
      url: `/policlinics/${id}/practices`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getNextPageDailyPractice: (token, id, page) =>
    instance({
      method: `GET`,
      url: `/policlinics/${id}/practices?page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getDailyPracticesById: (token, id) =>
    instance({
      method: `GET`,
      url: `/practices/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //checkup reservations
  createCheckUpReservation: (token, { patient_id, practice_id }) =>
    instance({
      method: `POST`,
      url: `/reservations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        patient_id: patient_id,
        practice_id: practice_id,
      },
    }),

  getAllCheckUpReservations: (token) =>
    instance({
      method: `GET`,
      url: `/reservations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //bed Register
  createBedRegistrations: (token, { hospital_id, patient_id }) =>
    instance({
      method: `POST`,
      url: `/registrations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        hospital_id: hospital_id,
        patient_id: patient_id,
      },
    }),

  updateBedRegistrations: (
    token,
    id,
    {
      hospital_id,
      patient_id,
      bed_id,
      status_pasien,
      biaya_registrasi,
      kode_daftar,
      link_pembayaran,
      status_pembayaran,
    }
  ) =>
    instance({
      method: `PUT`,
      url: `/registrations/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        hospital_id: hospital_id,
        patient_id: patient_id,
        bed_id: bed_id,
        status_pasien: status_pasien,
        biaya_registrasi: biaya_registrasi,
        kode_daftar: kode_daftar,
        link_pembayaran: link_pembayaran,
        status_pembayaran: status_pembayaran,
      },
    }),
  ngambilBedYangKedaftarDiHospital: (token, hospitalid) =>
    instance({
      method: `GET`,
      url: `/hospital/${hospitalid}/registrations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  DeleteBedRegistrationsById: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/registrations/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //payment
  updatePayments: (token, kode_daftar, { metode_pembayaran }) =>
    instance({
      method: `PUT`,
      url: `/payments/${kode_daftar}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        metode_pembayaran: metode_pembayaran,
      },
    }),

  getPaymentsById: (token, kode_daftar) =>
    instance({
      method: `GET`,
      url: `/payments/${kode_daftar}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //invoice
  updateInvoiceMidtrans: (token, { kode_daftar, gross_amount, status }) =>
    instance({
      method: `PUT`,
      url: `/midtrans`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        kode_daftar: kode_daftar,
        gross_amount: gross_amount,
        status: status,
      },
    }),

  getAllBedRegistrations: (token) =>
    instance({
      method: `GET`,
      url: `/registrations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getBedRegistrationsById: (token, id) =>
    instance({
      method: `GET`,
      url: `/registrations/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  DeleteBedRegistrationsById: (token, id) =>
    instance({
      method: `DELETE`,
      url: `/registrations/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //payment
  updatePayments: (token, kode_daftar, { metode_pembayaran }) =>
    instance({
      method: `PUT`,
      url: `/payments/${kode_daftar}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        metode_pembayaran: metode_pembayaran,
      },
    }),

  getPaymentsById: (token, kode_daftar) =>
    instance({
      method: `GET`,
      url: `/payments/${kode_daftar}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  //invoice
  updateInvoiceMidtrans: (token, { kode_daftar, gross_amount, status }) =>
    instance({
      method: `PUT`,
      url: `/midtrans`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        kode_daftar: kode_daftar,
        gross_amount: gross_amount,
        status: status,
      },
    }),
};
