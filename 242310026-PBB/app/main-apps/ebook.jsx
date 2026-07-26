import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color_list } from "../../components/module-latihan/latihan_4/styles/StyleApps";

// Latihan 2 - Menu Drawer: Fitur Pemutar E-Book
export default function EbookReader() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: color_list.cream, alignItems: "center", justifyContent: "center", padding: 30 }}
    >
      <FontAwesome5 name="book-reader" size={60} color={color_list.green} />
      <Text style={{ fontSize: 20, fontWeight: "bold", color: color_list.green, marginTop: 15 }}>
        E-Book Reader
      </Text>
      <Text style={{ fontSize: 14, color: "gray", textAlign: "center", marginTop: 8 }}>
        Fitur pemutar e-book akan menampilkan halaman baca untuk buku yang sedang kamu baca.
        Pilih buku dari Katalog atau Beranda untuk mulai membaca.
      </Text>
    </SafeAreaView>
  );
}
