import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Quiz1() {
  const personalData = {
    nama: "Bambang Pamungkas",
    nip: "1234567890",
    jabatan: "Rektor",
    institusi: "IBI Kesatuan",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Avatar */}
      <View style={styles.headers.container}>
        <Image
          source={require("../../assets/images/avatars/avatar.jpeg")}
          style={styles.headers.img_avatar}
        />
      </View>

      {/* Form: Input Data */}
      <View style={styles.identity.container}>
        
        {/* Input Nama */}
        <View style={styles.identity.input_row}>
          <Text style={styles.identity.label}>Nama:</Text>
          <View style={styles.identity.card_input}>
            <TextInput value={personalData.nama} style={styles.identity.input_text} />
          </View>
        </View>

        {/* Input NIP */}
        <View style={styles.identity.input_row}>
          <Text style={styles.identity.label}>NIP:</Text>
          <View style={styles.identity.card_input}>
            <TextInput value={personalData.nip} style={styles.identity.input_text} keyboardType="numeric" />
          </View>
        </View>

        {/* Input Jabatan */}
        <View style={styles.identity.input_row}>
          <Text style={styles.identity.label}>Jabatan:</Text>
          <View style={styles.identity.card_input}>
            <TextInput value={personalData.jabatan} style={styles.identity.input_text} />
          </View>
        </View>

        {/* Input Institusi */}
        <View style={styles.identity.input_row}>
          <Text style={styles.identity.label}>Institusi:</Text>
          <View style={[styles.identity.card_input, { borderColor: '#000', borderWidth: 2 }]}>
            <TextInput value={personalData.institusi} style={styles.identity.input_text} />
          </View>
        </View>

        {/* Button Submit */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity style={styles.identity.button}>
            <Text style={styles.identity.button_text}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headers: {
    container: {
      alignItems: "center",
      marginTop: 50,
      marginBottom: 30,
    },
    img_avatar: {
      width: 150,
      height: 150,
      borderRadius: 100,
      borderColor: "#000",
      borderWidth: 5,
    },
  },
  identity: {
    container: {
      alignSelf: "stretch",
    },
    input_row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    label: {
      flex: 1,
      fontSize: 16,
      color: "#9b9d9f",
      textAlign: "right",
      marginRight: 10,
    },
    card_input: {
      flex: 3,
      borderWidth: 1,
      borderColor: "#9b9d9f",
      borderRadius: 10,
      paddingHorizontal: 10,
      justifyContent: "center",
    },
    input_text: {
      color: "#000",
      fontSize: 16,
      paddingVertical: 5,
    },
    button: {
      backgroundColor: "#17a2b8",
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 10,
    },
    button_text: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
  },
});