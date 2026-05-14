import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { color_list, styles } from "../styles/StyleApps";

export default function BookCollection({ 
  books, 
  total_item, 
  currentPage, 
  setCurrentPage, 
  itemsPerPage 
}) {
  // Mengurutkan buku berdasarkan ID dari yang terbesar ke terkecil
  const sortedBooks = [...books].sort((a, b) => b.id - a.id);
  
  // Latihan 3: Menghitung total halaman
  const totalPages = Math.ceil(total_item / itemsPerPage);

  // Fungsi untuk merender nomor halaman (maksimal 5 nomor)
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity 
          key={i} 
          onPress={() => setCurrentPage(i)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: currentPage === i ? color_list.green : "white",
            marginHorizontal: 4,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: color_list.green
          }}
        >
          <Text style={{ 
            color: currentPage === i ? "white" : color_list.green,
            fontWeight: "bold" 
          }}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return pages;
  };

  return (
    <View style={styles.container_book_collections}>
      <View style={styles.h_container}>
        <Text style={styles.container_book_collections_title}>
          Book Collection
        </Text>
        <Text style={{ color: "gray", fontSize: 12 }}>
          Total {total_item} items
        </Text>
      </View>

      {/* Latihan 2 & 3: Logika Kondisional Data & Paging */}
      {books.length > 0 ? (
        <>
          <BookList books={sortedBooks} />
          
          {/* View Paging (image_872f72.jpg) */}
          <View style={{ 
            flexDirection: "row", 
            justifyContent: "center", 
            alignItems: "center",
            marginTop: 20,
            marginBottom: 10
          }}>
            {/* Tombol ke Halaman Pertama (<<) */}
            <TouchableOpacity 
              onPress={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              style={[styles.btn_page, { opacity: currentPage === 1 ? 0.4 : 1 }]}
            >
              <Text style={{ color: color_list.green }}>{"<<"}</Text>
            </TouchableOpacity>

            {/* Nomor Halaman Dinamis */}
            {renderPagination()}

            {/* Tombol ke Halaman Terakhir (>>) */}
            <TouchableOpacity 
              onPress={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              style={[styles.btn_page, { opacity: currentPage === totalPages ? 0.4 : 1 }]}
            >
              <Text style={{ color: color_list.green }}>{">>"}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{
          padding: 20,
          borderWidth: 1,
          borderColor: color_list.green,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10
        }}>
          <Text style={{ color: color_list.green, fontWeight: "600" }}>
            No record found
          </Text>
        </View>
      )}
    </View>
  );
}

// --- Komponen Pendukung (BookList, BookItemImg, BookItemContent) ---

const BookList = ({ books }) => {
  return (
    <View style={styles.book_grid}>
      {books.map((book, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.book_card, styles.shadow]}
          activeOpacity={0.7}
        >
          <BookItemImg book={book} />
          <BookItemContent book={book} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BookItemImg = ({ book }) => {
  return (
    <View style={{ position: "relative" }}>
      <Image
        source={book.img}
        style={styles.book_card_img}
        resizeMode="cover"
      />
      {!book.is_free && (
        <View style={[styles.circle_premium_small, styles.shadow]}>
          <AntDesign name="crown" size={18} color="black" />
        </View>
      )}
    </View>
  );
};

const BookItemContent = ({ book }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text
        style={styles.book_card_title}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {book.title}
      </Text>
      <Text style={styles.book_card_author} numberOfLines={1}>
        {book.author}
      </Text>

      <View style={styles.book_card_footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="star" size={14} color={color_list.orange} />
          <Text style={styles.book_card_rating}>{book.rating}</Text>
        </View>
        
        {book.views && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="eye-outline" size={14} color="gray" />
            <Text style={styles.book_card_views}>{book.views}</Text>
          </View>
        )}
      </View>
    </View>
  );
};