import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router"; // 1. Import useRouter untuk navigasi halaman
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/StyleApps";

const CTABook = ({ book }) => {
  return (
    <View style={[styles.new_com_container, styles.shadow]}>
      <View style={{ flexDirection: "row" }}>
        <CTAImage book={book} />
        <View style={{ marginLeft: 15, flex: 1, flexShrink: 1, justifyContent: "space-between" }}>
          <CTAInfoBook book={book} />
          {/* 2. Kirim properti book ke dalam ButtonRead */}
          <ButtonRead book={book} />
        </View>
      </View>
    </View>
  );
};

const CTAImage = ({ book }) => {
  return (
    <View style={{ position: "relative" }}>
      <Image 
        source={book.img} 
        style={[styles.new_book_img, styles.shadow]} 
        resizeMode="cover" 
      />
      {/* Jika is_free bernilai false (Premium), mahkota akan muncul */}
      {!book.is_free && (
        <View style={[styles.circle_premium, styles.shadow]}>
          <AntDesign name="crown" size={18} color="black" />
        </View>
      )}
    </View>
  );
};

const CTAInfoBook = ({ book }) => {
  return (
    <View>
      <Text style={styles.new_book_title}>{book.title}</Text>
      <Text style={styles.new_book_text}>by {book.author}</Text>
      <View style={{ marginTop: 10 }}>
        <Text 
          style={styles.new_book_text} 
          numberOfLines={3} 
          ellipsizeMode="tail"
        >
          {book.sinopsis}
        </Text>
      </View>
    </View>
  );
};

// 3. Update ButtonRead untuk menerima props book dan melakukan routing parameter id
const ButtonRead = ({ book }) => {
  const router = useRouter();

  const handleReadNow = () => {
    if (book && book.id) {
      // Mengarahkan ke route dinamis /books/[id] (contoh: /books/6)
      router.push(`/books/${book.id}`);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.btn_read, styles.shadow]} 
      onPress={handleReadNow} // Jalankan fungsi routing saat ditekan
      activeOpacity={0.8}
    >
      <Text style={styles.btn_read_text}>Read Now</Text>
    </TouchableOpacity>
  );
};

export default CTABook;