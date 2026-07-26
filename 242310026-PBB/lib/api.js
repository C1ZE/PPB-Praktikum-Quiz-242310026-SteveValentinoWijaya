import axios from "axios";

// BAB 8.3 - Langkah 2: Base URL FakeStoreAPI
const BASE_URL = "https://fakestoreapi.com";

/**
 * AXIOS_REQUEST
 * Wrapper/pembungkus untuk axios yang:
 * - Menyederhanakan error handling
 * - Memberikan response format yang konsisten: { loading, message, data }
 * - Menangani berbagai jenis error (server error, network error, error lainnya)
 */
export const AXIOS_REQUEST = async (config) => {
  try {
    const response = await axios(config);
    return { loading: false, message: "", data: response.data };
  } catch (error) {
    console.warn("Error in AXIOS_REQUEST:", error);

    let errorMessage = "Gagal memproses permintaan";

    if (error.response) {
      // A. error.response -> Server merespons, tapi dengan status error
      if (error.response.status === 400) {
        errorMessage = "Format request tidak valid";
      } else if (error.response.status === 401) {
        errorMessage = "Username atau password salah";
      } else if (error.response.status === 404) {
        errorMessage = "Data tidak ditemukan";
      } else if (error.response.status === 500) {
        errorMessage = "Terjadi kesalahan pada server";
      } else {
        errorMessage = `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      // B. error.request -> Request terkirim tapi tidak ada response dari server
      errorMessage = "Tidak ada respon dari server. Periksa koneksi internet.";
    } else {
      errorMessage = error.message || "Terjadi kesalahan yang tidak terduga";
    }

    return { loading: false, message: errorMessage, data: null };
  }
};

/**
 * AUTH_USER
 * BAB 8.3 - Langkah 2: POST https://fakestoreapi.com/auth/login
 * param: { username, password }
 */
export const AUTH_USER = async (param) => {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `${BASE_URL}/auth/login`,
    data: param,
  };

  const response = await AXIOS_REQUEST(config);
  console.log("AUTH_USER response:", response);
  return response;
};

/**
 * REGISTER_USER
 * BAB 8.4 - Latihan 1: POST https://fakestoreapi.com/users
 * param: { username, email, password }
 */
export const REGISTER_USER = async (param) => {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `${BASE_URL}/users`,
    data: param,
  };

  const response = await AXIOS_REQUEST(config);
  console.log("REGISTER_USER response:", response);
  return response;
};
