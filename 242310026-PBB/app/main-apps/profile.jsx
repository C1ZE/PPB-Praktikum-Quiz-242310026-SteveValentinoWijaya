import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color_list } from "../../components/module-latihan/latihan_4/styles/StyleApps";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const router = useRouter();
  // BAB 8.4 - Latihan 3: status login & fungsi Sign Out
  const { userData, signOut } = useAuth();

  const [avatarUri, setAvatarUri] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [profile, setProfile] = useState({
    phone: "081234567890",
    email: "steve.valentino@ibik.ac.id",
    address: "Jl. Rangga Gading No.01, Gudang, Kecamatan Bogor Tengah",
  });

  const showImagePickerOptions = () => {
    Alert.alert("Change Avatar", "Choose an option", [
      { text: "Take Photo", onPress: handleOpenCamera },
      { text: "Choose from Gallery", onPress: pickImageFromGallery },
      { text: "Cancel", style: "cancel" },
    ], { cancelable: true });
  };

  const handleOpenCamera = async () => {
    if (!permission || !permission.granted) {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera permission is required to take photos");
        return;
      }
    }
    setIsCameraVisible(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.8, base64: false });
        setAvatarUri(photo.uri);
        setIsCameraVisible(false);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery permission is required to select photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Alert.alert("Berhasil", "Data profil berhasil diperbarui");
  };

  // BAB 8.4 - Latihan 3: Fitur Sign Out
  const handleSignOut = () => {
    Alert.alert("Keluar akun?", "Kamu perlu Sign In lagi untuk membaca buku.", [
      { text: "Batal", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/auth/signin");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        {/* BAB 8.4 - Latihan 3: Status akun & Sign Out */}
        <View style={styles.accountCard}>
          {userData ? (
            <>
              <View style={styles.accountRow}>
                <Text style={styles.accountLabel}>Signed in as</Text>
                <Text style={styles.accountValue}>{userData.username}</Text>
              </View>
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.accountLabel}>Kamu belum Sign In</Text>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => router.push("/auth/signin")}
              >
                <Text style={styles.signOutButtonText}>Sign In</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity onPress={showImagePickerOptions}>
          <View style={styles.avatarContainer}>
            <Image
              source={avatarUri ? { uri: avatarUri } : require("../../assets/images/avatars/avatar.jpeg")}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.cameraIconOverlay}>
              <Text style={{ color: "white", fontSize: 12 }}>Edit</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>Steve Valentino Wijaya</Text>
        <Text style={styles.npm}>NPM: 242310026 | TI-24-KA</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={profile.phone}
            onChangeText={(t) => handleChange("phone", t)}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            onChangeText={(t) => handleChange("email", t)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={profile.address}
            onChangeText={(t) => handleChange("address", t)}
            multiline
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal kamera untuk ambil foto avatar */}
      <Modal
        visible={isCameraVisible}
        animationType="slide"
        onRequestClose={() => setIsCameraVisible(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing="front" mode="picture">
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsCameraVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <View style={{ width: 80 }} />
            </View>
          </CameraView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color_list.cream },
  accountCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  accountRow: { marginBottom: 12 },
  accountLabel: { fontSize: 12, color: "gray" },
  accountValue: { fontSize: 16, fontWeight: "bold", color: "#222", marginTop: 2 },
  signOutButton: {
    backgroundColor: "#d64545",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  signInButton: {
    backgroundColor: color_list.green,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signOutButtonText: { color: "white", fontWeight: "700", fontSize: 14 },
  avatarContainer: { position: "relative" },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: color_list.green,
  },
  cameraIconOverlay: {
    position: "absolute",
    bottom: 0,
    right: 5,
    backgroundColor: color_list.green,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 15, color: "#222" },
  npm: { fontSize: 13, color: "gray", marginTop: 2 },
  form: { width: "100%", marginTop: 25 },
  label: { fontSize: 13, color: "gray", marginBottom: 4, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
    fontSize: 14,
  },
  saveButton: {
    marginTop: 25,
    backgroundColor: color_list.green,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: { color: "white", fontWeight: "bold", fontSize: 15 },
  cameraContainer: { flex: 1, backgroundColor: "black" },
  camera: { flex: 1 },
  cameraControls: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  cancelButton: { justifyContent: "center" },
  buttonText: { color: "white", fontSize: 16 },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: "white" },
});
