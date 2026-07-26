import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { COLORS, RADIUS, SHADOW } from "../theme";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { orders } = useOrders();

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  const confirmLogout = () => {
    Alert.alert("Keluar akun?", "Kamu perlu login lagi untuk memesan.", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, paddingTop: insets.top + 10 }}>
      <Text style={styles.pageTitle}>Profil Saya 👤</Text>

      <View style={styles.avatarCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitial}>
            {(user?.name || user?.username || "U").charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || user?.username}</Text>
        {user?.email && <Text style={styles.email}>{user.email}</Text>}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{orders.length}</Text>
          <Text style={styles.statLabel}>Total Pesanan</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>Rp {totalSpent.toLocaleString("id-ID")}</Text>
          <Text style={styles.statLabel}>Total Belanja</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={confirmLogout}>
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: { fontSize: 22, fontWeight: "800", color: COLORS.text, paddingHorizontal: 20, marginBottom: 16 },
  avatarCard: { alignItems: "center", marginBottom: 20 },
  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { color: "#fff", fontSize: 32, fontWeight: "800" },
  name: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginTop: 10 },
  email: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  statsRow: { flexDirection: "row", paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 16,
    alignItems: "center",
    ...SHADOW,
  },
  statValue: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 4 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.danger,
    marginHorizontal: 20,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    gap: 8,
  },
  logoutText: { color: "#fff", fontWeight: "700" },
});
