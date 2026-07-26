import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color_list } from "../components/module-latihan/latihan_4/styles/StyleApps";

// Praktikum 6.3 - Langkah 3: Landing Page aplikasi (app/index.jsx)
export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color_list.green,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Ionicons name="book" size={44} color={color_list.green} />
      </View>

      <Text style={{ fontSize: 26, fontWeight: "bold", color: "white" }}>Readly+</Text>
      <Text style={{ fontSize: 14, color: "#e8e8e8", textAlign: "center", marginTop: 8 }}>
        Discover · Subscribe · Read Anywhere
      </Text>
      <Text style={{ fontSize: 13, color: "#e8e8e8", textAlign: "center", marginTop: 4, marginBottom: 40 }}>
        Temukan ribuan buku, jelajahi katalog, dan mulai perjalanan membacamu kapan saja, di mana saja.
      </Text>

      <Link href="/main-apps" asChild>
        <Pressable
          style={{
            backgroundColor: "white",
            paddingVertical: 14,
            paddingHorizontal: 40,
            borderRadius: 12,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: color_list.green, fontWeight: "bold", fontSize: 15 }}>Get Started →</Text>
        </Pressable>
      </Link>

      <Link href="/search" asChild>
        <Pressable style={{ marginTop: 18 }}>
          <Text style={{ color: "white", textDecorationLine: "underline" }}>Cari buku langsung</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}
