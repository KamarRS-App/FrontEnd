import axios from "axios";

const instance = axios.create({
    baseURL: "http://dev.farizdotid.com/api/daerahindonesia/",
});

export default {
    getProvinsi: () =>
        instance({
            method: `GET`,
            url: `/provinsi`
        }),
    getDetailProvinsi: (id) =>
        instance({
            method: `GET`,
            url: `/provinsi/${id}`
        }),
    getKotaKabupateByProvinsi: (id) =>
        instance({
            method: `GET`,
            url: `/kota?id_provinsi=${id}`
        }),
    getDetailKotaKabupaten: (id) =>
        instance({
            method: `GET`,
            url: `kota/${id}`
        }),
    getKecamatanByKota: (id) =>
        instance({
            method: `GET`,
            url: `/kecamatan?id_kota=${id}`
        }),
    getDetailKecamatan: (id) =>
        instance({
            method: `GET`,
            url: `/kecamatan/${id}`
        })
}