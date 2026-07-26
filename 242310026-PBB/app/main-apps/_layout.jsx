import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Latihan 1 & 2 (BAB 6 - Tugas Praktikum):
// Drawer Navigation berperan sebagai navigasi global yang menghubungkan
// beberapa modul utama aplikasi e-catalog buku.
export default function DrawerLayout() {
  return (
    // GestureHandlerRootView wajib ditambahkan agar menu drawer bisa ditarik/geser
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true, // Memunculkan burger menu di kiri atas
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#49745e" },
          headerTitleStyle: { fontWeight: "bold" },
          drawerActiveTintColor: "#49745e", // Warna menu yang aktif
          drawerInactiveTintColor: "gray",
          drawerLabelStyle: { fontSize: 15, fontWeight: "600" },
          drawerStyle: {
            backgroundColor: "#f8f6f1", // Warna background side-menu
            width: 250, // Lebar slide side-menu
          },
        }}
      >
        {/* Menu 1: Beranda -> mengarah ke Tab Navigation (Home & Explore) */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Beranda",
            title: "Readly+",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        {/* Menu 2: Katalog Buku */}
        <Drawer.Screen
          name="katalog"
          options={{
            drawerLabel: "Katalog Buku",
            title: "Katalog Buku",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
          }}
        />

        {/* Menu 3: Buku Premium (Subscription) */}
        <Drawer.Screen
          name="premium"
          options={{
            drawerLabel: "Buku Premium",
            title: "Buku Premium",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="crown" size={size} color={color} />
            ),
          }}
        />

        {/* Menu 4: Fitur Pemutar E-Book */}
        <Drawer.Screen
          name="ebook"
          options={{
            drawerLabel: "E-Book Reader",
            title: "E-Book Reader",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="book-reader" size={size} color={color} />
            ),
          }}
        />

        {/* Menu 5: Profile mahasiswa */}
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "My Profile",
            title: "Profile Mahasiswa",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />

        {/* Menu 6: Scan QR Code Buku (BAB 7 - Latihan 2) */}
        <Drawer.Screen
          name="scan"
          options={{
            drawerLabel: "Scan QR Buku",
            title: "Scan QR Code",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="qr-code" size={size} color={color} />
            ),
          }}
        />

        {/* Menu 7: Galeri QR Code (bantu testing Latihan 2) */}
        <Drawer.Screen
          name="qrcodes"
          options={{
            drawerLabel: "QR Code Buku",
            title: "QR Code Buku",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="images" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
