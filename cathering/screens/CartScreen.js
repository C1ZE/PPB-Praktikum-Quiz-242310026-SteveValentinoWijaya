import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { COLORS, RADIUS, SHADOW } from "../theme";

const SERVICE_FEE = 2000;

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { items, addItem, decreaseItem, removeItem, clearCart, totalPrice } =
    useCart();
  const { addOrder } = useOrders();
  const [checkingOut, setCheckingOut] = useState(false);

  const grandTotal = items.length > 0 ? totalPrice + SERVICE_FEE : 0;

  const handleCheckout = async () => {
    setCheckingOut(true);
    await addOrder(items, grandTotal);
    clearCart();
    setCheckingOut(false);
    Alert.alert(
      "Pesanan Berhasil! 🎉",
      "Pesananmu sudah masuk ke dapur kantin. Cek status di menu History.",
      [
        {
          text: "Lihat History",
          onPress: () => navigation.navigate("History"),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, paddingTop: insets.top + 10 }}>
      <Text style={styles.pageTitle}>Keranjang Saya 🛒</Text>

      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={{ fontSize: 60 }}>🍽️</Text>
          <Text style={styles.emptyText}>Keranjangmu masih kosong</Text>
          <Text style={styles.emptySub}>Yuk pilih menu favoritmu dulu!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    Rp {item.price.toLocaleString("id-ID")} x {item.qty}
                  </Text>
                </View>
                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => decreaseItem(item.id)}
                  >
                    <Ionicons name="remove" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => addItem(item)}
                  >
                    <Ionicons name="add" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={{ marginLeft: 10 }}
                >
                  <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                Rp {totalPrice.toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Biaya Layanan</Text>
              <Text style={styles.summaryValue}>
                Rp {SERVICE_FEE.toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={[styles.summaryRow, { marginTop: 6 }]}>
              <Text style={styles.totalLabel}>Total Bayar</Text>
              <Text style={styles.totalValue}>
                Rp {grandTotal.toLocaleString("id-ID")}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleCheckout}
              disabled={checkingOut}
            >
              <Text style={styles.checkoutText}>
                {checkingOut ? "Memproses..." : "Checkout Sekarang"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: { fontSize: 22, fontWeight: "800", color: COLORS.text, paddingHorizontal: 20, marginBottom: 6 },
  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginTop: 10 },
  emptySub: { color: COLORS.textLight, marginTop: 4 },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 10,
    ...SHADOW,
  },
  emoji: { fontSize: 26 },
  itemName: { fontWeight: "700", color: COLORS.text },
  itemPrice: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepBtn: { padding: 6 },
  qtyText: { minWidth: 16, textAlign: "center", fontWeight: "700", color: COLORS.text },
  summary: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    padding: 20,
    paddingBottom: 30,
    ...SHADOW,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  summaryLabel: { color: COLORS.textLight },
  summaryValue: { color: COLORS.text, fontWeight: "600" },
  totalLabel: { fontWeight: "800", fontSize: 16, color: COLORS.text },
  totalValue: { fontWeight: "800", fontSize: 16, color: COLORS.primary },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
