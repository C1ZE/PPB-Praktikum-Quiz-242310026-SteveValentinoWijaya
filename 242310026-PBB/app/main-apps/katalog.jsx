import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";
import { color_list, styles } from "../../components/module-latihan/latihan_4/styles/StyleApps";

// Latihan 2 - Menu Drawer: Katalog Buku
// Menampilkan seluruh koleksi buku, tap salah satu untuk melihat detail (Latihan 3)
export default function Katalog() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 15 }}>
          <Text style={styles.title}>Katalog Buku</Text>
          <Text style={styles.sub_title}>Total {ListBook.length} judul tersedia</Text>
        </View>

        <View style={styles.book_grid}>
          {ListBook.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={[styles.book_card, styles.shadow]}
              activeOpacity={0.7}
              onPress={() => router.push(`/books/${book.id}`)}
            >
              <View style={{ position: "relative" }}>
                <Image source={book.img} style={styles.book_card_img} resizeMode="cover" />
                {!book.is_free && (
                  <View style={[styles.circle_premium_small, styles.shadow]}>
                    <AntDesign name="crown" size={18} color="black" />
                  </View>
                )}
              </View>
              <View style={{ padding: 10 }}>
                <Text style={styles.book_card_title} numberOfLines={2}>{book.title}</Text>
                <Text style={styles.book_card_author} numberOfLines={1}>{book.author}</Text>
                <View style={styles.book_card_footer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="star" size={14} color={color_list.orange} />
                    <Text style={styles.book_card_rating}>{book.rating}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="eye-outline" size={14} color="gray" />
                    <Text style={styles.book_card_views}>{book.views}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
