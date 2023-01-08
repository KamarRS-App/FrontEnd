import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.binderbyte.com/wilayah",
});

export default {
    getProvinsi: () =>
        instance({
            method: `GET`,
            url: `/provinsi?api_key=${import.meta.env.VITE_API_KEY}`
        }),
        getKotaKabupateByProvinsi: (id) =>
        instance({
            method: `GET`,
            url: `/kabupaten?api_key=${import.meta.env.VITE_API_KEY}&id_provinsi=${id}`
        }),
    getKecamatanByKota: (id) =>
        instance({
            method: `GET`,
            url: `/kecamatan?api_key=${import.meta.env.VITE_API_KEY}&id_kabupaten=${id}`
        })
}