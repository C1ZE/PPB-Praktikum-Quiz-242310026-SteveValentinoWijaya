import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/StyleApps";

const Header = () => {
  return (
    <View style={styles.h_container}>
      <View>
        <Text style={styles.sub_title}>Good Morning👋</Text>
        <Text style={styles.title}>Discover Books</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity style={[styles.btn_icon, styles.shadow]}>
          <Ionicons name="search-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_icon}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;