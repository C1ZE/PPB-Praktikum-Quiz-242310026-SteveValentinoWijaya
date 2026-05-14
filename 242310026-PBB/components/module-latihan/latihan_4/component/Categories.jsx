import { Text, TouchableOpacity, View } from "react-native";
import { color_list, styles } from "../styles/StyleApps";

const Categoriesnav = () => {
  const categories = ["All", "Free", "Premium", "Popular"];
  
  return (
    <View style={styles.categ_badge_container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categ_badge,
            {
              backgroundColor:
                category === "All" ? color_list.green : color_list.green_light,
            },
          ]}
          activeOpacity={0.8}
        >
          {/* Pastikan teks ini benar-benar di dalam komponen Text */}
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              color: category === "All" ? color_list.white : color_list.green,
            }}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Categoriesnav;