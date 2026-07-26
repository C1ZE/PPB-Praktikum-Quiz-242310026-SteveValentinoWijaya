import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { color_list } from "../../styles/StyleApps";

// Menampilkan daftar toko buku terdekat di dalam BottomSheet
export default function ListStores({ stores = [] }) {
  if (stores.length === 0) {
    return (
      <Text style={{ paddingHorizontal: 15, color: "gray" }}>
        Tidak ada toko buku ditemukan di sekitar lokasi Anda.
      </Text>
    );
  }

  return (
    <View>
      {stores.map((store) => (
        <View key={store.id} style={styles.item}>
          <View style={styles.iconWrap}>
            <Ionicons name="storefront-outline" size={22} color={color_list.green} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{store.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
              <Ionicons name="star" size={14} color={color_list.orange} />
              <Text style={styles.meta}> {store.rating}</Text>
            </View>
            <Text style={styles.meta}>
              {store.hours} &middot; {store.phone}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0eee7",
  },
  iconWrap: { marginRight: 12, marginTop: 2 },
  title: { fontSize: 15, fontWeight: "700", color: "#222" },
  meta: { fontSize: 12, color: "gray", marginTop: 2 },
});
