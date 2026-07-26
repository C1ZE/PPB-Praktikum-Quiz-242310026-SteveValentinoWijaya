import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MenuCard from "../components/MenuCard";
import CategoryPill from "../components/CategoryPill";
import { MENU_DATA } from "../data/menuData";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { COLORS, RADIUS } from "../theme";

const CATEGORIES = ["Semua", "Makanan", "Minuman"];

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { items, addItem, decreaseItem, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MENU_DATA.filter((m) => {
      const matchCategory = category === "Semua" || m.category === category;
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const getQty = (id) => {
    const found = items.find((i) => i.id === id);
    return found ? found.qty : 0;
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={[styles.header, { paddingTop: insets.top + 14 }]}
      >
        <Text style={styles.greeting}>
          Halo, {user?.name?.split(" ")[0] || user?.username} 👋
        </Text>
        <Text style={styles.headerTitle}>Mau makan apa hari ini?</Text>

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari menu..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      <View style={styles.pillRow}>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(i) => i}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <CategoryPill
              label={item}
              active={category === item}
              onPress={() => setCategory(item)}
            />
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: totalItems > 0 ? 100 : 20 }}
        renderItem={({ item }) => (
          <MenuCard
            item={item}
            qty={getQty(item.id)}
            onAdd={() => addItem(item)}
            onRemove={() => decreaseItem(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Menu tidak ditemukan 🔍</Text>
        }
      />

      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.cartBar}
          onPress={() => navigation.navigate("Keranjang")}
          activeOpacity={0.85}
        >
          <View>
            <Text style={styles.cartBarSmall}>{totalItems} item</Text>
            <Text style={styles.cartBarTotal}>
              Rp {totalPrice.toLocaleString("id-ID")}
            </Text>
          </View>
          <Text style={styles.cartBarCta}>Lihat Keranjang →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
  },
  greeting: { color: "#fff", opacity: 0.9, fontSize: 13 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 2, marginBottom: 14 },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: { marginLeft: 8, flex: 1, color: COLORS.text },
  pillRow: { paddingVertical: 14 },
  emptyText: { textAlign: "center", color: COLORS.textLight, marginTop: 40 },
  cartBar: {
    position: "absolute",
    bottom: 12,
    left: 16,
    right: 16,
    backgroundColor: COLORS.text,
    borderRadius: RADIUS.md,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartBarSmall: { color: "#ccc", fontSize: 11 },
  cartBarTotal: { color: "#fff", fontWeight: "800", fontSize: 16 },
  cartBarCta: { color: COLORS.accent, fontWeight: "700" },
});
