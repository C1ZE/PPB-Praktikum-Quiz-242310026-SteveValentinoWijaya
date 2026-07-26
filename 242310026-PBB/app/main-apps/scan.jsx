import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";
import { color_list } from "../../components/module-latihan/latihan_4/styles/StyleApps";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) {
    return <View style={styles.center} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ textAlign: "center", marginBottom: 15, paddingHorizontal: 30 }}>
          Aplikasi membutuhkan akses kamera untuk memindai QR Code buku
        </Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Izinkan Kamera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Ambil ID buku dari isi QR Code, mendukung format polos "3" atau "book:3"
  const extractBookId = (data) => {
    const match = String(data).match(/(\d+)\s*$/);
    return match ? match[1] : null;
  };

  const handleBarcodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);

    const id = extractBookId(data);
    const book = id ? ListBook.find((b) => String(b.id) === id) : null;

    if (book) {
      router.replace(`/books/${book.id}`);
    } else {
      Alert.alert("QR Code tidak dikenali", `Isi QR: ${data}`, [
        { text: "Scan Ulang", onPress: () => setScanned(false) },
        { text: "Kembali", onPress: () => router.back() },
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      <SafeAreaView edges={["top"]} style={styles.headerOverlay}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.frameWrapper} pointerEvents="none">
        <View style={styles.frame} />
        <Text style={styles.hintText}>Arahkan kamera ke QR Code pada buku</Text>
      </View>

      {scanned && (
        <TouchableOpacity style={styles.rescanBtn} onPress={() => setScanned(false)}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Scan Ulang</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: color_list.cream },
  permissionBtn: {
    backgroundColor: color_list.green,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  headerOverlay: { position: "absolute", top: 0, left: 0, right: 0 },
  backBtn: {
    marginTop: 10,
    marginLeft: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  frameWrapper: { flex: 1, alignItems: "center", justifyContent: "center" },
  frame: {
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: color_list.green,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  hintText: {
    color: "white",
    marginTop: 20,
    fontSize: 13,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rescanBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: color_list.green,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
