import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function Latihan3() {
  // Latihan 1: Data personal dengan minimal 6 tipe data berbeda
  const personalData = {
    name: "Steve Valentino Wijaya", // String
    nim: 242310026, // Number
    phone_number: "081234567890", // String
    email: "steve.valentino@student.ibik.ac.id", // String
    address: "Bogor, Jawa Barat", // String
    is_active: true, // Boolean
    hobbies: ["Gaming", "Coding", "Networking"], // Array
    social_media: { github: "C1ZE", instagram: "@stevevw" } // Object
  };

  return (
    // Latihan 2: Memanfaatkan ScrollView sebagai container utama
    <ScrollView style={styles.scrollContainer}>
      {/* Latihan 2: Menambahkan ImageBackground */}
      <ImageBackground 
        source={require("../../../assets/images/avatars/background.png")} // Pastikan file ini ada di folder assets/images/
        style={styles.bgImage}
      >
        <View style={styles.contentContainer}>
          {/* Header Profile */}
          <Image
            source={require("../../../assets/images/avatars/avatar.jpeg")} // Jalur file sesuai image_a2059b.png
            style={styles.headers.img_avatar}
          />
          <Text style={styles.headers.title}>{personalData.name}</Text>
          <Text style={styles.headers.subtitle}>{personalData.nim}</Text>

          {/* Form Identity Section */}
          <View style={styles.identity.container}>
            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Phone</Text>
              <TextInput
                value={personalData.phone_number}
                style={styles.identity.input_text}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Email</Text>
              <TextInput
                value={personalData.email}
                style={styles.identity.input_text}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Address</Text>
              <TextInput
                value={personalData.address}
                style={styles.identity.input_text}
                multiline={true}
              />
            </View>

            {/* Menampilkan Data Tambahan (Array & Boolean) */}
            <View style={styles.additionalInfo}>
              <Text>Status Aktif: {personalData.is_active ? "Ya" : "Tidak"}</Text>
              <Text>Hobi: {personalData.hobbies.join(", ")}</Text>
            </View>

            <View style={{ marginTop: 15 }}>
              <TouchableOpacity style={styles.identity.button}>
                <Text style={styles.identity.button_text}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    minHeight: 800, // Memastikan background menutupi layar
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  headers: {
    title: { fontWeight: "bold", fontSize: 24, marginTop: 10, color: "#000" },
    subtitle: { fontWeight: "bold", fontSize: 16, color: "#555" },
    img_avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderColor: "#0ea6d0",
      borderWidth: 4,
    },
  },
  identity: {
    container: {
      alignSelf: "stretch",
      padding: 15,
      marginTop: 20,
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Agar teks terbaca di atas background
      borderRadius: 15,
    },
    card_input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
      backgroundColor: "#fff",
    },
    title: { color: "#888", fontSize: 12 },
    input_text: { color: "#000", fontSize: 16, fontWeight: "500" },
    button: {
      alignItems: "center",
      backgroundColor: "#0ea6d0",
      padding: 15,
      borderRadius: 10,
    },
    button_text: { fontSize: 18, color: "white", fontWeight: "bold" },
  },
  additionalInfo: {
    marginVertical: 10,
    padding: 5,
  }
});