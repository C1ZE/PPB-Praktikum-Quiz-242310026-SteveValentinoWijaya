import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";
import { color_list, styles } from "../../components/module-latihan/latihan_4/styles/StyleApps";

// Halaman bantu untuk Latihan 2 (QR Scanner):
// Menampilkan QR Code tiap buku supaya bisa dites dengan fitur "Scan QR Buku".
// Cara pakai: buka halaman ini di layar LAIN (laptop/tablet/HP kedua),
// lalu arahkan kamera dari menu "Scan QR Buku" ke salah satu QR di bawah ini.
export default function QRCodes() {
  const router = useRouter();

  const qrImages = {
    1: require("../../assets/images/qrcodes/book-1.png"),
    2: require("../../assets/images/qrcodes/book-2.png"),
    3: require("../../assets/images/qrcodes/book-3.png"),
    4: require("../../assets/images/qrcodes/book-4.png"),
    5: require("../../assets/images/qrcodes/book-5.png"),
    6: require("../../assets/images/qrcodes/book-6.png"),
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>QR Code Buku (Testing)</Text>
        <Text style={styles.sub_title}>
          Buka halaman ini di layar lain, lalu scan salah satu QR di bawah dari menu "Scan QR
          Buku"
        </Text>

        {ListBook.map((book) => (
          <View
            key={book.id}
            style={[
              styles.new_com_container,
              styles.shadow,
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Image source={qrImages[book.id]} style={{ width: 90, height: 90 }} resizeMode="contain" />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.new_book_title}>{book.title}</Text>
              <Text style={styles.new_book_text}>by {book.author}</Text>
              <TouchableOpacity
                style={{ marginTop: 8 }}
                onPress={() => router.push(`/books/${book.id}`)}
              >
                <Text style={{ color: color_list.green, fontWeight: "bold", fontSize: 12 }}>
                  Lihat detail buku →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
