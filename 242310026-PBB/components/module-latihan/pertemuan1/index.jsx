import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f11616ff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        {" "}
        Selamat Datang di Praktikum Pemrograman Perangkat Bergerak{" "}
      </Text>
      <Text> Nama : Steve Valentino Wijaya </Text>
      <Text> NIM : 242310026 </Text>
      <Text> Prodi : Teknologi Informasi </Text>
      <Text> Angkatan : 2023/2024 </Text>
      <Text> Kelas : TI-24-KA </Text>
    </View>
  );
}