import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { AUTH_USER, REGISTER_USER } from "../lib/api";

const USER_KEY = "userData";
const TOKEN_KEY = "authToken";

const AuthContext = createContext(null);

// SecureStore hanya berjalan di native (Android/iOS). Di web (expo start --web)
// kita fallback ke localStorage supaya tetap bisa dites dari browser.
const Storage = {
  async getItem(key) {
    if (Platform.OS === "web") return localStorage.getItem(key);
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key, value) {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key) {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // BAB 8.3 - Langkah 4: cek session yang tersimpan setiap kali app dibuka
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const saved = await Storage.getItem(USER_KEY);
      if (saved) {
        setUserData(JSON.parse(saved));
      }
    } catch (error) {
      console.warn("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // BAB 8.3 - Langkah 2 & 3: Sign In via FakeStoreAPI, lalu simpan token & userData ke SecureStore
  const signIn = async (username, password) => {
    const result = await AUTH_USER({ username, password });

    if (result.message) {
      return { success: false, message: result.message };
    }

    if (!result.data || !result.data.token) {
      return { success: false, message: "Respon tidak valid dari server" };
    }

    const newUserData = {
      username,
      token: result.data.token,
      loginTime: new Date().toISOString(),
    };

    try {
      await Storage.setItem(USER_KEY, JSON.stringify(newUserData));
      await Storage.setItem(TOKEN_KEY, result.data.token);
      setUserData(newUserData);
      return { success: true };
    } catch (error) {
      console.error("Error saving user data:", error);
      return { success: false, message: "Gagal menyimpan sesi login" };
    }
  };

  // BAB 8.4 - Latihan 1: Sign Up (POST /users) untuk simulasi pembuatan akun
  const signUp = async ({ username, email, password }) => {
    const result = await REGISTER_USER({ username, email, password });

    if (result.message || !result.data || result.data.id === undefined) {
      return { success: false, message: "Gagal membuat akun" };
    }

    return { success: true };
  };

  // BAB 8.4 - Latihan 3: Sign Out, hapus seluruh session pengguna
  const signOut = async () => {
    try {
      await Storage.removeItem(USER_KEY);
      await Storage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.warn("Error clearing session:", error);
    } finally {
      setUserData(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoading,
        isLoggedIn: !!userData,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
