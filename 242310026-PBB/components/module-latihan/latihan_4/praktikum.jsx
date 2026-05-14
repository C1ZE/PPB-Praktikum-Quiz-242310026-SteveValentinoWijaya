import { useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../constants/list_books";
import BookCollection from "./component/BookCollection";
import Categoriesnav from "./component/Categories";
import CTABook from "./component/CTABook";
import Header from "./component/Header";
import SearchBar from "./component/SearchBar";
import { color_list, styles } from "./styles/StyleApps";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(ListBook);

  // --- LATIHAN 3: State untuk Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Limit data per halaman

  // Optimalisasi dengan useMemo untuk mendukung pencarian (Pertemuan 5)
  const BookDataMemori = useMemo(() => {
    let computedData = [...books];
    if (search.trim() !== "") {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null && 
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            return false;
          }
        });
      });
    }
    return computedData;
  }, [search, books]);

  // --- LATIHAN 3: Logika Pemotongan Data (Paging) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Data yang akan ditampilkan di layar (Hanya 4 buku per halaman)
  const currentBooks = BookDataMemori.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk handle search (Reset ke halaman 1 saat mengetik)
  const handleSearch = (text) => {
    setSearch(text);
    setCurrentPage(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Header />
      
      {/* SearchBar dengan fungsi reset page */}
      <SearchBar value={search} setValue={handleSearch} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {/* Banner & Kategori sembunyi otomatis saat mencari */}
          {search.trim() === "" ? (
            <>
              <CTABook book={ListBook[ListBook.length - 1]} />
              <Categoriesnav />
            </>
          ) : null}
          
          <View style={{ marginTop: 10 }}>
            {/* Mengirimkan data yang sudah di-slice (currentBooks) dan props paging */}
            <BookCollection 
              books={currentBooks} 
              total_item={BookDataMemori.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          </View>
        </View>

        {/* Identitas Mahasiswa IBIK */}
        <View style={{ marginTop: 20, alignItems: 'center', paddingBottom: 50 }}>
          <Text style={{ color: color_list.green, fontWeight: 'bold' }}>
            Steve Valentino Wijaya - 242310026
          </Text>
          <Text style={{ color: 'gray', fontSize: 12 }}>Pertemuan 5 | Latihan 3: Paging</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}