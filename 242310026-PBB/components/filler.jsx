import { useState } from "react";
import {
  Alert, ImageBackground,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

const Filler = () => {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [aktif, setAktif] = useState("");

  const onPressButton = () => {
    Alert.alert("You tapped the button!");
  };

  const Data = [
    { name: "Prabowo Subianto", jabatan: "Presiden RI ke-7", aktif: true },
    { name: "Joko Widodo", jabatan: "Presiden RI ke-6", aktif: false },
    {
      name: "Gibran Rakabuming ",
      jabatan: "Wakil Presiden RI ke-7",
      aktif: true,
    },
    { name: "Jusuf Kalla", jabatan: "Wakil Presiden RI ke-6", aktif: false },
    { name: "Ma'ruf Amin", jabatan: "Wakil Presiden RI ke-6", aktif: false },
  ];
  return (
    <View>
      <Text>List Presiden dan Wakil Presiden</Text>
      {Data.map((item, index) => (
        <Text key={index}>
          {item.name} - {item.jabatan} - {item.aktif ? "Aktif" : "Tidak Aktif"}
        </Text>
      ))}
      <ImageBackground
        source={require("../assets/images/icon.png")}
        style={{ width: "100%", height: 200, marginTop: 20 }}
        resizeMode="cover"
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Tambah List Presiden & Wakil Presiden
          </Text>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Nama: </Text>
          <TextInput
            placeholder="Masukkan Nama"
            value={nama}
            onChangeText={(text) => setNama(text)}
            style={{
              marginBottom: 10,
              padding: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              width: "80%",
            }}
          />
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Jabatan: </Text>
          <TextInput
            placeholder="Masukkan Jabatan"
            value={jabatan}
            onChangeText={(text) => setJabatan(text)}
            style={{
              marginBottom: 10,
              padding: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              width: "80%",
            }}
          />
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Status Aktif:{" "}
          </Text>
          <TextInput
            placeholder="Masukkan Status Aktif"
            value={aktif}
            onChangeText={(text) => setAktif(text)}
            style={{
              marginBottom: 10,
              padding: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              width: "80%",
            }}
          />
        </View>
      </ImageBackground>
      <TouchableHighlight
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#007bff",
          borderRadius: 10,
        }}
        onPress={onPressButton}
        underlayColor="black"
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Cancel</Text>
      </TouchableHighlight>
      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#28a745",
          borderRadius: 10,
        }}
        onPress={onPressButton}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Tambah</Text>
      </TouchableOpacity>
      <Pressable
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#ffc107",
          borderRadius: 10,
        }}
        onPress={onPressButton}
      >
        <Text style={{ color: "#000", fontWeight: "bold" }}>Press Me</Text>
      </Pressable>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={{ marginTop: 20, padding: 10, backgroundColor: "#eee" }}>
          <Text style={{ fontWeight: "bold" }}>Touchable Without Feedback</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Filler;