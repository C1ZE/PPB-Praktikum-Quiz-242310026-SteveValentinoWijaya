import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OrderContext = createContext(null);

const STORAGE_KEY = "@cathering_orders";

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setOrders(JSON.parse(saved));
      } catch (e) {
        console.log("Gagal memuat riwayat pesanan:", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const addOrder = async (cartItems, total) => {
    const newOrder = {
      id: `TRX-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItems,
      total,
      status: "Selesai",
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newOrder;
  };

  const clearHistory = async () => {
    setOrders([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OrderContext.Provider
      value={{ orders, isLoading, addOrder, clearHistory }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
