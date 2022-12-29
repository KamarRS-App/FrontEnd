import axios from "axios";

const instance = axios.create({
  baseURL: "34.143.247.242/",
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
    createPatient: (token, { no_kk, nik, nama_pasien, jenis_kelamin, usia, nama_wali, email_wali, no_telepon_wali, alamat_ktp, kabupaten_kota_ktp, alamat_domisili, provinsi_domisili, kabupaten_kota_domisili, tanggal_lahir, no_bpjs, kelas_bpjs, foto_ktp, foto_bpjs }) =>
        instance({
            method: `POST`,
            url: `/patients`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
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
                foto_bpjs: foto_bpjs
            }
        }),
    updatePatient: (token, id, { no_kk, nik, nama_pasien, jenis_kelamin, usia, nama_wali, email_wali, no_telepon_wali, alamat_ktp, kabupaten_kota_ktp, alamat_domisili, provinsi_domisili, kabupaten_kota_domisili, tanggal_lahir, no_bpjs, kelas_bpjs, foto_ktp, foto_bpjs }) =>
        instance({
            method: `PUT`,
            url: `/patients/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
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
                foto_bpjs: foto_bpjs
            }
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
    createHospitalBed: (token, { hospital_id, nama_tempat_tidur, ruangan, kelas, status }) =>
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
            }
        }),
    updateHospitalBed: (token, id, { hospital_id, nama_tempat_tidur, ruangan, kelas, status }) =>
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
            }
        }),
    getAllBeds: (token) =>
        instance({
            method: `GET`,
            url: `/beds`,
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
    createDoctor: (token, { nama, email, bidang, no_telpon }) =>
        instance({
            method: `POST`,
            url: `/doctors`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                nama: nama,
                email: email,
                bidang: bidang,
                no_telpon: no_telpon
            }
        }),
    updateDoctor: (token, id, { nama, email, bidang, no_telpon }) =>
        instance({
            method: `PUT`,
            url: `/doctors/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                nama: nama,
                email: email,
                bidang: bidang,
                no_telpon: no_telpon
            }
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
    createPoliclinic: (token, { hospital_id, doctors_id, nama_poli, jam_praktik }) =>
        instance({
            method: `POST`,
            url: `/policlinics`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                hospital_id: hospital_id,
                doctors_id: doctors_id,
                nama_poli: nama_poli,
                jam_praktik: jam_praktik
            }
        }),
    updatePoliclinic: (token, id, { hospital_id, doctors_id, nama_poli, jam_praktik }) =>
        instance({
            method: `PUT`,
            url: `/policlinics/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                hospital_id: hospital_id,
                doctors_id: doctors_id,
                nama_poli: nama_poli,
                jam_praktik: jam_praktik
            }
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

    //daily practice
    createDailyPractice: (token, { policlinic_id, tanggal_praktik, kuota_harian, status }) =>
        instance({
            method: `POST`,
            url: `/practices`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                policlinic_id: policlinic_id,
                tanggal_praktik: tanggal_praktik,
                kuota_harian: kuota_harian,
                status: status
            }
        }),
    updateDailyPractice: (token, id, { policlinic_id, tanggal_praktik, kuota_harian, status }) =>
        instance({
            method: `PUT`,
            url: `/practices/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                policlinic_id: policlinic_id,
                tanggal_praktik: tanggal_praktik,
                kuota_harian: kuota_harian,
                status: status
            }
        }),
    getAllDailyPractices: (token) =>
        instance({
            method: `GET`,
            url: `/practices`,
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
            }
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
                patient_id: patient_id
            },
        }),

    updateBedRegistrations: (token, id, { hospital_id, patient_id, bed_id, status_pasien, biaya_registrasi, kode_daftar, link_pembayaran, status_pembayaran }) =>
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
                status_pembayaran: status_pembayaran
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
    updatePayments: (token, kode_daftar, {metode_pembayaran}) =>
        instance({
            method: `PUT`,
            url: `/payments/${kode_daftar}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                metode_pembayaran: metode_pembayaran,
            }
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
    updateInvoiceMidtrans: (token, {kode_daftar, gross_amount, status}) =>
        instance({
            method: `PUT`,
            url: `/midtrans`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                kode_daftar: kode_daftar,
                gross_amount: gross_amount,
                status: status
            }
        }),
}
