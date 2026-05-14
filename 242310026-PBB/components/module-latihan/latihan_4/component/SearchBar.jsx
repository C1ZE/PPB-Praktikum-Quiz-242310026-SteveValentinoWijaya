import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, View } from "react-native";
import { styles } from "../styles/StyleApps";

// Langkah 1: Menambahkan prop value dan setValue (image_91b3fc.png)
export default function SearchBar({ value, setValue }) {
  return (
    <View style={styles.h_container}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        height: 50,
        flex: 1
      }}>
        <Ionicons name="search-outline" size={16} color="gray" />
        <TextInput
          autoFocus
          placeholder="Search here"
          value={value} // Inisialisasi prop value
          onChangeText={(text) => setValue(text)} // Mengirimkan teks ke state parent
          style={{ flex: 1, marginLeft: 10 }}
        />
      </View>
    </View>
  );
}