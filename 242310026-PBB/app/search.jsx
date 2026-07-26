import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../constants/list_books";
import BookCollection from "../components/module-latihan/latihan_4/component/BookCollection";
import SearchBar from "../components/module-latihan/latihan_4/component/SearchBar";
import { color_list, styles } from "../components/module-latihan/latihan_4/styles/StyleApps";

// Praktikum 6.3 - Langkah 1: search.jsx berada di root Stack Navigation
// (bukan bagian dari main-apps/Tab), dipanggil dari Landing Page.
export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    if (search.trim() === "") return [];
    return ListBook.filter((book) =>
      Object.values(book).some(
        (value) => value != null && String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={22} color={color_list.green} />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 5 }]}>Cari Buku</Text>
      </View>

      <SearchBar value={search} setValue={setSearch} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {search.trim() === "" ? (
          <Text style={{ color: "gray", marginTop: 10 }}>
            Ketik judul, penulis, atau kata kunci untuk mencari buku.
          </Text>
        ) : (
          <BookCollection
            books={results}
            total_item={results.length}
            currentPage={1}
            setCurrentPage={() => {}}
            itemsPerPage={results.length || 1}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
