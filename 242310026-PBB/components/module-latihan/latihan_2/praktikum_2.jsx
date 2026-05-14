import { ScrollView, StyleSheet, Text, View } from "react-native";

const Praktikum2 = () => {
  // 1. Data diri dalam bentuk object
  const user = {
    nama: "Steve Valentino Wijaya",
    berat: 65, // kg
    tinggi: 170, // cm
  };

  // 2. Data porsi makanan harian (array of object)
  const porsiMakan = [
    { id: 1, waktu: "Sarapan", kalori: 450 },
    { id: 2, waktu: "Makan Siang", kalori: 700 },
    { id: 3, waktu: "Makan Malam", kalori: 500 },
    { id: 4, waktu: "Camilan", kalori: 250 },
  ];

  // 3. Menghitung total kalori harian menggunakan perulangan (looping)
  let totalKalori = 0;
  porsiMakan.forEach((item) => {
    totalKalori += item.kalori;
  });

  // 4. Konversi tinggi badan ke meter
  const tinggiMeter = user.tinggi / 100;

  // 5. Menghitung Body Mass Index (BMI)
  const bmi = (user.berat / (tinggiMeter * tinggiMeter)).toFixed(2);

  // 6. Menentukan status BMI (percabangan)
  let statusBMI = "";
  if (bmi < 18.5) statusBMI = "Kurus";
  else if (bmi >= 18.5 && bmi <= 24.9) statusBMI = "Ideal";
  else statusBMI = "Berlebih";

  // 7. Menentukan kategori asupan kalori (percabangan)
  let statusKalori = "";
  if (totalKalori < 1600) statusKalori = "Asupan kalori kurang";
  else if (totalKalori >= 1600 && totalKalori <= 2200) statusKalori = "Asupan kalori cukup";
  else statusKalori = "Asupan kalori berlebih";

  // 8. Logika kesimpulan akhir
  let kesimpulan = "";
  if (statusBMI === "Ideal" && statusKalori === "Asupan kalori cukup") {
    kesimpulan = "Berat badan sudah ideal dan asupan kalori sesuai.";
  } else {
    kesimpulan = "Perlu penyesuaian pola makan atau aktivitas fisik.";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>Evaluasi Berat Badan Ideal</Text>

      {/* Menampilkan informasi data diri */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Pasien</Text>
        <Text>Nama: {user.nama}</Text>
        <Text>Berat Badan: {user.berat} kg</Text>
        <Text>Tinggi Badan: {user.tinggi} cm</Text>
      </View>

      {/* Menampilkan daftar porsi makanan */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Porsi Makanan Harian</Text>
        {porsiMakan.map((item) => (
          <Text key={item.id}>
            {item.waktu} - {item.kalori} kalori
          </Text>
        ))}
        <Text style={styles.boldText}>Total Kalori: {totalKalori}</Text>
      </View>

      {/* Menampilkan hasil perhitungan */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Hasil Perhitungan</Text>
        <Text>BMI: {bmi}</Text>
        <Text>Status BMI: {statusBMI}</Text>
        <Text>Status Kalori: {statusKalori}</Text>
      </View>

      <Text style={styles.kesimpulanText}>{kesimpulan}</Text>
    </ScrollView>
  );
};

// Pastikan style menggunakan objek tanpa tanda kutip pada pemanggilannya
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
    marginTop: 5,
  },
  kesimpulanText: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "blue",
    marginTop: 10,
  },
});

export default Praktikum2;