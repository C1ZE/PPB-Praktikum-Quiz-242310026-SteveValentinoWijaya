import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";
import { color_list, styles } from "../../components/module-latihan/latihan_4/styles/StyleApps";

// Latihan 2 - Menu Drawer: Buku Premium (Subscription)
// Menampilkan buku dengan status is_free === false
export default function Premium() {
  const router = useRouter();
  const premiumBooks = ListBook.filter((book) => !book.is_free);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 15, flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="crown" size={20} color={color_list.orange} />
          <Text style={[styles.title, { marginLeft: 8 }]}>Buku Premium</Text>
        </View>
        <Text style={styles.sub_title}>Berlangganan untuk membaca {premiumBooks.length} judul eksklusif</Text>

        {premiumBooks.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={[styles.new_com_container, styles.shadow, { marginTop: 15 }]}
            activeOpacity={0.7}
            onPress={() => router.push(`/books/${book.id}`)}
          >
            <View style={{ flexDirection: "row" }}>
              <Image source={book.img} style={styles.new_book_img} resizeMode="cover" />
              <View style={{ marginLeft: 15, flex: 1, justifyContent: "space-between" }}>
                <View>
                  <Text style={styles.new_book_title}>{book.title}</Text>
                  <Text style={styles.new_book_text}>by {book.author}</Text>
                </View>
                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: color_list.orange,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>Subscribe</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
