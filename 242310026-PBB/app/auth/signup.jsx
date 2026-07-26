import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// BAB 8.4 - Latihan 1: Halaman Sign-Up (Terhubung ke API)
// Input: Username, Email, Password, Re-Type Password, Tombol Register
export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Validasi: field tidak boleh kosong
    if (!username.trim() || !email.trim() || !password.trim() || !retypePassword.trim()) {
      Alert.alert("Error", "Semua field wajib diisi");
      return;
    }
    // Validasi: format email harus valid
    if (!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Error", "Format email tidak valid");
      return;
    }
    // Validasi: password dan re-type password harus sama
    if (password !== retypePassword) {
      Alert.alert("Error", "Password dan Re-Type Password tidak sama");
      return;
    }

    setIsLoading(true);
    // Wajib request ke endpoint POST https://fakestoreapi.com/users
    const result = await signUp({ username: username.trim(), email: email.trim(), password });
    setIsLoading(false);

    if (result.success) {
      // Jika berhasil tersimpan, arahkan pengguna ke halaman Sign In
      Alert.alert("Berhasil", "Akun berhasil dibuat, silakan Sign In", [
        { text: "OK", onPress: () => router.replace("/auth/signin") },
      ]);
    } else {
      // Jika tidak, tampilkan informasi "Gagal membuat akun"
      Alert.alert("Gagal membuat akun", "Silakan coba lagi");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Ionicons name="book" size={36} color={color_list.green} />
            </View>
            <Text style={styles.brand}>Readly+</Text>
            <Text style={styles.subtitle}>Sign up to continue</Text>
          </View>

          <View style={styles.inputWrap}>
            <Ionicons name="person-outline" size={18} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={18} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={18} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={18} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Re-Type Password"
              autoCapitalize="none"
              secureTextEntry
              value={retypePassword}
              onChangeText={setRetypePassword}
            />
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnPrimaryText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={{ color: "gray" }}>Sudah punya akun? </Text>
            <Link href="/auth/signin" asChild>
              <TouchableOpacity>
                <Text style={{ color: color_list.green, fontWeight: "700" }}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color_list.cream },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  logoWrap: { alignItems: "center", marginBottom: 26 },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  brand: { fontSize: 26, fontWeight: "800", color: color_list.green },
  subtitle: { color: "gray", marginTop: 4 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    gap: 8,
  },
  input: { flex: 1, color: "#222" },
  btnPrimary: {
    backgroundColor: color_list.green,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  btnPrimaryText: { color: "white", fontWeight: "700", fontSize: 15 },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 22 },
});
