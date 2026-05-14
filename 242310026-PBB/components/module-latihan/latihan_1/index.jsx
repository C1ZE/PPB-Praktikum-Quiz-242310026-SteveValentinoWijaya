import { StyleSheet, Text, View } from "react-native";

export default function Latihan1() {
  return (
    <View style={styles.container}>
      {/* Bagian Welcome */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>👋 Welcome</Text>
        <Text style={styles.subHeaderText}>Praktikum Pemograman Perangkat Bergerak</Text>
      </View>

      {/* Bagian Identitas (Kode Praktikum-1) */}
      <View style={styles.identitasContainer}>
        <Text style={styles.text}>Nama: Steve Valentino Wijaya</Text>
        <Text style={styles.text}>NPM: 242310026</Text>
        <Text style={styles.text}>Prodi: Teknologi Informasi (Informatika)</Text>
        <Text style={styles.text}>Angkatan: 2024</Text>
        <Text style={styles.text}>Kelas: TI-24-KA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  identitasContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
});