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

// BAB 8.3 - Langkah 1: Halaman/komponen SignIn
// Form login terdiri dari TextInput Username & Password (secureTextEntry)
export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();

  // Akun demo resmi FakeStoreAPI sudah diisi otomatis agar mudah diuji
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    // Validasi username tidak boleh kosong
    if (!username.trim()) {
      Alert.alert("Error", "Username tidak boleh kosong");
      return;
    }
    // Validasi password tidak boleh kosong
    if (!password.trim()) {
      Alert.alert("Error", "Password tidak boleh kosong");
      return;
    }

    // BAB 8.3 - Langkah 2 & 3: request ke API + simpan token ke SecureStore
    setIsLoading(true);
    const result = await signIn(username.trim(), password);
    setIsLoading(false);

    if (result.success) {
      Alert.alert("Berhasil", `Selamat datang, ${username}!`, [
        { text: "OK", onPress: () => router.replace("/main-apps") },
      ]);
    } else {
      Alert.alert("Gagal Masuk", result.message || "Username atau password salah");
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
            <Text style={styles.subtitle}>Sign in to continue</Text>
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
            <Ionicons name="lock-closed-outline" size={18} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="gray" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleSignIn} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnPrimaryText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.hint}>
            Akun demo FakeStoreAPI sudah terisi otomatis, tinggal tekan{" "}
            <Text style={{ fontWeight: "700" }}>Sign In</Text>.
          </Text>

          <View style={styles.footerRow}>
            <Text style={{ color: "gray" }}>Belum punya akun? </Text>
            <Link href="/auth/signup" asChild>
              <TouchableOpacity>
                <Text style={{ color: color_list.green, fontWeight: "700" }}>Sign Up</Text>
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
  logoWrap: { alignItems: "center", marginBottom: 30 },
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
  hint: { fontSize: 12, color: "gray", textAlign: "center", marginTop: 14 },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 22 },
});
