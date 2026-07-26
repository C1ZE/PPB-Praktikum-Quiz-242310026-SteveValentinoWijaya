import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

const STORAGE_KEY = "@cathering_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cek sesi login yang tersimpan setiap kali app dibuka
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setUser(parsed.user);
          setToken(parsed.token);
        }
      } catch (e) {
        console.log("Gagal memuat sesi:", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Login menggunakan endpoint auth FakeStoreAPI
  // Akun demo resmi FakeStoreAPI: username "mor_2314" / password "83r5^_"
  const login = async (username, password) => {
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Username atau password salah");
      }

      const data = await res.json();
      if (!data.token) {
        throw new Error("Login gagal, token tidak ditemukan");
      }

      // Ambil data user tambahan (opsional, untuk ditampilkan di profil)
      // Catatan: FakeStoreAPI hanya menyediakan data dummy (mis. "David Morrison"),
      // jadi nama & email ditampilkan dengan identitas mahasiswa sendiri.
      let userProfile = {
        username,
        name: "Steve Valentino Wijaya",
        email: "242310026@gmail.com",
      };

      setToken(data.token);
      setUser(userProfile);

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user: userProfile, token: data.token })
      );

      return true;
    } catch (e) {
      setError(e.message || "Terjadi kesalahan saat login");
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
