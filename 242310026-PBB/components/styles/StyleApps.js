import { StyleSheet } from "react-native";

// 1. Deklarasi warna HARUS di atas agar bisa dibaca oleh StyleSheet
const color_list = {
  orange: "#e8ab30",
  green: "#49745e",
  green_light: "#49745e35",
  cream: "#f8f6f1",
  white: "#fff",
};

// 2. Deklarasi gaya pusat
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_list.cream,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  sub_title: { fontSize: 16, color: "gray" },
  h_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  btn_icon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: color_list.white,
    justifyContent: "center",
    alignItems: "center",
  },
  new_com_container: {
    borderRadius: 10,
    backgroundColor: color_list.green,
    padding: 20,
  },
  new_book_img: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  new_book_title: {
    color: color_list.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  new_book_text: {
    color: color_list.white,
    fontSize: 13,
    lineHeight: 16,
  },
  circle_premium: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: color_list.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_page: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#49745e", // sesuaikan dengan color_list.green
    justifyContent: "center",
    alignItems: "center",
  },
  btn_read: {
    width: 150,
    paddingVertical: 8,
    backgroundColor: color_list.white,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_read_text: {
    fontSize: 14,
    color: color_list.green,
  },
  // Style untuk BookCollection
  container_book_collections: {
    flex: 1,
    marginTop: 10,
  },
  container_book_collections_title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  book_grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 20,
  },
  book_card: {
    width: "48%",
    backgroundColor: color_list.white,
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  book_card_img: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  circle_premium_small: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: color_list.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  book_card_title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
    minHeight: 34,
  },
  book_card_author: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  book_card_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  book_card_rating: {
    fontSize: 12,
    color: "black",
    marginLeft: 4,
    fontWeight: "600",
  },
  book_card_views: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
  },
  // Style untuk Categoriesnav (PINDAHAN DARI CATEGORIES.JSX)
  categ_badge_container: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
  },
  categ_badge: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categ_badge_container: {
    flexDirection: "row", // WAJIB ada agar berjejer ke samping
    marginTop: 15,
    marginBottom: 10,
    gap: 10, // Memberikan jarak antar kategori
  },
  categ_badge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

// 3. Export agar bisa diimpor dengan { styles, color_list }
export { color_list, styles };

